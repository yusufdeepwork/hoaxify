import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';


i18n.use(initReactI18next).init({

    resources : {

        en : {

            translations: {

                'Sign Up' : ' Sign Up',
                'Password mismatch': 'Password mismatch',
                Username : 'Username',
                'Display Name' : 'Display Name ',
                Password : 'Password',
                'Password Repeat' : 'Password Repeat',
                'Login': 'Login',
                'Logout':'Logout',
                'Users':'Users',
                'Next' : 'next >',
                'Previous' : '< previous',
                'Load Failure': 'Load Failure',
                'User not found': 'User not found',
                'Change Display Name' : 'Change Display Name',
                Save : 'Save',
                Cancel : 'Cancel',
                Edit: 'Edit'
            }

        },
        tr : {

            translations:{

                'Sign Up' : 'Kayıt Ol',               
                'Password mismatch': 'Aynı Şifreyi giriniz',
                Username : 'Kullanıcı Adı ',
                'Display Name' : 'Tercih Edilen İsim',
                Password : 'Şifre',
                'Password Repeat' : 'Şifreyi Tekrarla',
                'Login': 'Sisteme gir',
                'Logout':'Çık',
                'Users':'Kullanıcılar',
                'Next' : 'sonraki >',
                'Previous' : '< önceki',
                'Load Failure': 'Liste Alınamadı',
                'User not found': 'Kullanıcı Bulunamadı',
                'Change Display Name' : 'Görünür İsminizi Değiştirin',
                Save : 'Kaydet',
                Cancel : 'İptal Et',
                Edit: 'Düzenle'
            }
        }
    },
fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  });
  export default i18n;


