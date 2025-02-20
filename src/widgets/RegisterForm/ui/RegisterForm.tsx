
import { Flex, Form, Space } from 'antd';
import {useCallback, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {Button, Text, TextField} from "@/shared/ui"
import { RegisterFormData } from "@/widgets/RegisterForm/model/Types.ts";
import { Templates } from '@/shared/templates/Templates.tsx';

const {
  IS_ERROR_EMAIL_TEXT,
  IS_ERROR_CONFIRMPASSWORD_TEXT,
  IS_ERROR_STRONGPASSWORD_TEXT,
  IS_ERROR_LASTNAME_TEXT,
  IS_ERROR_FIRSTNAME_TEXT,
  IS_ERROR_FATHERNAME_TEXT,
  IS_HAVE_ACCOUNT,
  REGISTRATION_TEXT,
  EMAIL_TEXT,
  PASSWORD_TEXT,
  LASTNAME_TEXT,
  FIRSTNAME_TEXT,
  FATHERNAME_TEXT,
  CONFIRM_PASSWORD_TEXT,
  CREATE_ACCOUNT_TEXT,
  ENTER_LINK_TEXT,
  PASSWORD_RULES
} = Templates
export const RegisterForm = () => {

  const [form] = Form.useForm<RegisterFormData>();

  const {email, password, confirmPassword, lastName, firstName} = Form.useWatch(({email, password, confirmPassword, lastName, firstName,})=>({email, password, confirmPassword, lastName, firstName}), form)?? {
    email:'',
    password:'',
    confirmPassword:'',
    lastName:'',
    firstName:'',
  };

  const isErrorEmail=useMemo(()=>{
    return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email);
  },[email]);

  const isErrorPassword=useMemo(()=>{
    const hasMinLength = password?.length >= 8;
    const hasUpperLetter = /[A-ZА-Я]/.test(password);
    const hasLowerLetter = /[a-zа-я]/.test(password);
    const hasSpecialCharacter = /[#!\$%&^*_+\|=?,\.\/\\]/.test(password);
    return !(hasMinLength && hasUpperLetter && hasUpperLetter && hasLowerLetter && hasSpecialCharacter);

  },[password]);

  const [isVisibleSupportTextPassword, setIsVisibleSupportTextPassword] = useState<boolean>(true);

  const handleInputFocus = () => {
    setIsVisibleSupportTextPassword(true);
  };

  const handleInputBlur = () => {
    setIsVisibleSupportTextPassword(false);
  };

  const onFinish = useCallback((values: RegisterFormData) => {
    console.log(values)
  },[]);

  return(
      <>
        <Form className="grid place-items-center w-88" onFinish={onFinish} layout='vertical' form={form}>
          <Flex vertical gap={10}>
            <Text className="w-full text-3xl font-bold">
              {REGISTRATION_TEXT}
            </Text>

            <TextField
                errorText={IS_ERROR_LASTNAME_TEXT}
                name='lastName'
                label={LASTNAME_TEXT}
                isError={lastName?.length==0}

            />

            <TextField
                errorText={IS_ERROR_FIRSTNAME_TEXT}
                name='firstName'
                label={FIRSTNAME_TEXT}
                isError={firstName?.length==0}
            />

            <TextField
                errorText={IS_ERROR_FATHERNAME_TEXT}
                name='fatherName'
                label={FATHERNAME_TEXT}
                isRequired={false}
            />

            <TextField
                errorText={IS_ERROR_EMAIL_TEXT}
                name='email'
                label={EMAIL_TEXT}
                isError={isErrorEmail}
            />


            <TextField
                errorText={IS_ERROR_STRONGPASSWORD_TEXT}
                name='password'
                label={PASSWORD_TEXT}
                isError={isErrorPassword}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isPassword
            />

            <Space style={{overflow: 'hidden', height: isVisibleSupportTextPassword ? 115 : 0, transition: 'height 0.5s ease-in-out'}}>
              <Text className="font-bold">
                {PASSWORD_RULES}
              </Text>
            </Space>

            <TextField
                errorText={IS_ERROR_CONFIRMPASSWORD_TEXT}
                name='confirmPassword'
                label={CONFIRM_PASSWORD_TEXT}
                isError={confirmPassword!=password}
                isPassword
            />

            <Button
                className="bg-orange-500 font-semibold text-lg"
                title={CREATE_ACCOUNT_TEXT}
                type='primary'
                htmlType='submit'
                size='large'
            />

            <Flex gap={10} className="font-semibold">
              <Text>
                {IS_HAVE_ACCOUNT}
              </Text>

              <Link to="/" className="text-blue-600 font-semibold hover:text-blue-500 active:text-blue-700 visited:text-blue-600">
                {ENTER_LINK_TEXT}
              </Link>
            </Flex>
          </Flex>
        </Form>
      </>
  )
}

