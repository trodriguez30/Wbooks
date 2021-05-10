import React, {useState} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {View, StatusBar, StyleSheet, Image, Text} from 'react-native';
import Header from '../components/Header';
import {Colors, FontStyle, Metrics} from '../definitions/theme';
import Modal from '../components/Modal';
import {logoutUser} from '../redux/auth/actions';
import {removeAllBooksToFavorites} from '../redux/books/actions';
import {ScrollView} from 'react-native-gesture-handler';
import Divider from '../components/Divider';
import Detail from '../components/Detail';
import moment from 'moment';

const logoutIcon = require('../assets/icons/logout.png');
const warningIcon = require('../assets/icons/warning.png');
const avatar = require('../assets/images/default_avatar.png');

export const Profile = (props: any) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const info = useSelector((state: RootStateOrAny) => state.auth.info);

  function handle_logout() {
    dispatch(removeAllBooksToFavorites());
    dispatch(logoutUser());
    props.navigation.push('AuthStack');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title={'Mi perfil'}
        onPress={() => setModalVisible(!modalVisible)}
        icon={logoutIcon}
      />
      <View style={styles.userContent}>
        <View style={styles.top}>
          <View style={styles.avatarContent}>
            <Image source={avatar} resizeMode="cover" style={styles.avatar} />
          </View>

          <View style={styles.details}>
            <Text
              style={
                styles.userName
              }>{`${info.first_name} ${info.last_name}`}</Text>
          </View>
        </View>
      </View>
      <Divider color={Colors.Primary} style={styles.divider} />
      <Text style={styles.subtitle}>Detalles de la cuenta</Text>
      <Detail
        icon={require('../assets/icons/at.png')}
        label="Correo"
        detail={info.email}
      />
      <Detail
        icon={require('../assets/icons/gender.png')}
        label="Sexo"
        detail={info.gender}
      />
      <Detail
        icon={require('../assets/icons/calendar.png')}
        label="Fecha de creación"
        detail={moment(info.created_at).format('L')}
      />
      <Divider color={Colors.Primary} style={styles.divider} />
      <Text style={styles.subtitle}>Configuración</Text>
      <Modal
        onClose={() => setModalVisible(false)}
        modalVisible={modalVisible}
        title="¿Seguro deseas cerrar sesión?"
        action={handle_logout}
        actionLabel="Si, cerrar sesión"
        icon={warningIcon}
        message="Al cerrar sesión se eliminarán los libros guardados como favoritos"
        closable
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  userContent: {
    width: '100%',
    paddingHorizontal: Metrics.Padding * 2,
    paddingBottom: Metrics.Padding * 2,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarContent: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: Metrics.Padding,
  },
  userName: {
    ...FontStyle.NormalBold,
    color: Colors.GrayScale.SuperDark,
  },
  divider: {width: '95%'},
  subtitle: {
    ...FontStyle.Subtitle,
    color: Colors.GrayScale.SuperDark,
    padding: Metrics.Padding * 2,
  },
});
export default Profile;
