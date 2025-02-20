import { useCallback, useMemo } from 'react';

import { Flex, Form } from 'antd';

import { Link } from 'react-router-dom';

import {Button, Text, TextField} from "@/shared/ui"

import { LoginFormData } from "@/widgets/LoginForm/model/Types.ts";

import { Templates } from '@/shared/templates/Templates.tsx';

const {
  IS_ERROR_EMAIL_TEXT,
  IS_ERROR_PASSWORD_TEXT,
  EMAIL_TEXT,
  PASSWORD_TEXT,
  BUTTON_TEXT,
  IS_NOT_EXIST_ACCOUNT,
  REGISTER_LINK_TEXT,
  ENTER_BUTTON_TEXT,
} = Templates

export function LoginForm() {

  const [form] = Form.useForm<LoginFormData>();

  const { email, password } = Form.useWatch(({ email, password }) => ({ email, password }), form) ?? {
    email: '',
    password: ''
  };

  const isErrorEmail = useMemo(() => {
    return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email);
  }, [email]);

  const onFinish = useCallback((values: LoginFormData) => {
    console.log(values);
  }, []);

  return (
      <>
        <Flex className="grid place-items-center">
        <Form className="w-88" onFinish={onFinish} layout='vertical' form={form}>
          <Flex vertical gap={10}>
            <Text className="w-full text-3xl font-bold">
              {ENTER_BUTTON_TEXT}
            </Text>
            <TextField
                errorText={IS_ERROR_EMAIL_TEXT}
                name='email'
                label={EMAIL_TEXT}
                isError={isErrorEmail}
            />
            <TextField
                errorText={IS_ERROR_PASSWORD_TEXT}
                name='password'
                label={PASSWORD_TEXT}
                isPassword
                isError={password?.length === 0}
            />
            <Button
                className="bg-orange-500 text-lg font-semibold"
                title={BUTTON_TEXT}
                type='primary'
                htmlType='submit'
                size='large'
            />
            <Flex gap={10} className="font-semibold">
              <Text>
                {IS_NOT_EXIST_ACCOUNT}
              </Text>
              <Link to='/register' className="text-blue-600 font-semibold hover:text-blue-500 active:text-blue-700 visited:text-blue-600">
                {REGISTER_LINK_TEXT}
              </Link>
            </Flex>
          </Flex>
        </Form>
        </Flex>
      </>
  );
}