import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
} from 'react-native';

import {Metrics, Shadow, Colors, FontStyle} from '../definitions/theme';
import {Formik, ErrorMessage} from 'formik';
import * as yup from 'yup';
import InputField from '../components/InputField';
import ErrorText from '../components/ErrorText';
import Checkbox from '../components/Checkbox';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {loginUser, clearLoginError} from '../redux/auth/actions';
import LoaderHOC from '../helpers/LoaderHOC';
import ModalSelector from 'react-native-modal-selector';
import {GENDER_ARRAY} from '../definitions/constants';
import Modal from '../components/Modal';

interface LoginValues {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

const initialValues: LoginValues = {
  first_name: '',
  last_name: '',
  email: '',
  gender: '',
};

const requiredText = 'Campo obligatorio!';
const LoginSchema = yup.object().shape({
  first_name: yup.string().required(requiredText),
  last_name: yup.string().required(requiredText),
  email: yup.string().email().required(requiredText),
  gender: yup.string().required(requiredText),
});

function Login(props: any) {
  const {setLoading, navigation} = props;

  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const authenticatingUser = useSelector(
    (state: RootStateOrAny) => state.auth.authenticatingUser,
  );

  const authenticated = useSelector(
    (state: RootStateOrAny) => state.auth.authenticated,
  );

  const authenticationError = useSelector(
    (state: RootStateOrAny) => state.auth.authenticationError,
  );

  const error = useSelector((state: RootStateOrAny) => state.auth.error);

  useEffect(() => {
    setLoading(false);
    if (authenticatingUser) {
      setLoading(true);
    }
    if (authenticated) {
      setLoading(false);
      navigation.push('AppStack');
    }
    if (authenticationError) {
      setLoading(false);
      setModalVisible(true);
    }
  }, [
    authenticatingUser,
    authenticated,
    authenticationError,
    setLoading,
    error,
    navigation,
  ]);

  function _setChecked(status: boolean) {
    setIsChecked(status);
  }

  function login(values: LoginValues) {
    const payload = {
      ...values,
      created_at: new Date(),
    };
    dispatch(loginUser(payload));
  }

  function handleErrorResponse() {
    setModalVisible(false);
    dispatch(clearLoginError());
  }

  const ErrorComponent = (propsError: any) => (
    <ErrorMessage name={propsError.name}>
      {(msg) => <ErrorText error={msg} />}
    </ErrorMessage>
  );

  return (
    <View style={styles.flex}>
      <ImageBackground
        source={require('../assets/Background.png')}
        style={styles.flex}>
        <View style={[styles.logoContainer, styles.paddingHorizontal]}>
          <Image
            source={require('../assets/logo.png')}
            resizeMode="contain"
            style={styles.logoDimensions}
          />
        </View>
        <Text style={[styles.title, styles.paddingHorizontal]}>Bienvenido</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => login(values)}
          validationSchema={LoginSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <KeyboardAvoidingView
              behavior="height"
              style={styles.formContainer}>
              <InputField
                label="Nombre"
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                error={<ErrorComponent name="first_name" />}
              />
              <InputField
                label="Apellido"
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                error={<ErrorComponent name="last_name" />}
              />
              <InputField
                label="Correo"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={<ErrorComponent name="email" />}
              />
              <ModalSelector
                data={[
                  {key: 0, section: true, label: 'Seleccione género'},
                  ...GENDER_ARRAY,
                ]}
                initValue=""
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option) => setFieldValue('gender', option.label)}>
                <InputField
                  label="Género"
                  onChangeText={handleChange('gender')}
                  onBlur={handleBlur('birthday')}
                  value={values.gender}
                  error={<ErrorComponent name="gender" />}
                  editable={false}
                />
              </ModalSelector>

              <Checkbox
                handleChecked={_setChecked}
                label="Acepto términos y condiciones"
              />
              <View style={styles.loginAction}>
                <Text style={[FontStyle.LabelButton, styles.loginButtonLabel]}>
                  Iniciar sesión
                </Text>
                <TouchableOpacity
                  disabled={!isChecked}
                  onPress={handleSubmit}
                  style={[
                    Shadow,
                    styles.loginButton,
                    FontStyle.LabelButton,
                    {color: Colors.GrayScale.White},
                  ]}>
                  <Image
                    source={require('../assets/icons/arrow_right.png')}
                    resizeMode="contain"
                    style={styles.iconButton}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.flex} />
            </KeyboardAvoidingView>
          )}
        </Formik>
      </ImageBackground>
      <StatusBar barStyle="dark-content" />
      <Modal
        onClose={handleErrorResponse}
        modalVisible={modalVisible}
        title={error}
        closable
        icon={require('../assets/icons/warning.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: Metrics.Padding,
  },
  container: {
    height: Metrics.ScreenWidth,
    width: Metrics.ScreenWidth,
  },
  logoContainer: {
    height: Metrics.ScreenHeight * 0.3,
    width: Metrics.ScreenWidth,
    justifyContent: 'center',
  },
  logoDimensions: {
    height: 100,
    width: 130,
  },
  title: {
    ...FontStyle.Big,
    color: Colors.GrayScale.SuperDark,
    marginBottom: Metrics.Margin * 2,
  },
  formContainer: {
    paddingHorizontal: Metrics.Padding * 2,
    flexDirection: 'column',
    justifyContent: 'center',
    height: Metrics.ScreenHeight * 0.7,
    width: '100%',
  },
  versionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionNumber: {
    ...FontStyle.Min,
    textAlign: 'center',
    color: Colors.Primary,
    ...Shadow,
  },
  loginAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  loginButton: {
    height: 50,
    width: 50,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  loginButtonLabel: {
    color: Colors.GrayScale.SuperDark,
  },
  iconButton: {
    height: 25,
    width: 25,
  },
});

export default LoaderHOC(Login, 'Verificando datos...');
