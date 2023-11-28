import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';

import FormInput from './FormInput';
import ModalContainer from './ModalContainer';

interface FormInputProps {
  mobile: string;
  username: string;
  email?: string;
  type?: number;
  errors?: any;
}

const ProfileModal = ({
  visible,
  onCancel,
  handleConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  handleConfirm: (v) => void;
}): JSX.Element => {
  const props = useForm<FormInputProps>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, errors, control, setValue, reset } = props;

  const onSubmit = useCallback(async (postData: FormInputProps) => {
    handleConfirm(postData);
  }, []);

  useEffect(() => {
    if (!visible) {
      reset({ username: '', email: '', mobile: '' });
    }
  }, [visible]);

  return (
    <ModalWrapper visible={visible} onCancel={onCancel}>
      <FormWrap>
        <Title>Change Profile</Title>
        <input type="text" style={{ display: 'none' }}></input>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <InputWrap>
            <div className="label">Input username</div>
            <FormInput
              name="username"
              type={'text'}
              isClear={true}
              // @ts-ignore
              autoFocus={true}
              padding={'12px 34px 12px 12px'}
              txtColor={'#000'}
              txtFontSize={'13px'}
              inputBackground={'#ffffff'}
              placeholderCss={'rgba(103, 111, 129, .5)'}
              borderColor={'#2e323c'}
              borderErrorColor={'#E94747'}
              borderRadius={2}
              placeholder="Username"
              rules={{
                required: true,
              }}
              setVal={() => {
                setValue('username', '', { shouldValidate: true });
              }}
              isError={errors && !!errors.username}
              control={control}
            />

            <ErrorFlexWrap>
              {errors.username ? <ErrorWrap>Please input correct username</ErrorWrap> : null}
            </ErrorFlexWrap>
          </InputWrap>

          <InputWrap>
            <div className="label">Input email</div>
            <FormInput
              name="email"
              type={'mail'}
              isClear={true}
              padding={'12px 34px 12px 12px'}
              txtColor={'#000'}
              txtFontSize={'13px'}
              inputBackground={'#ffffff'}
              placeholderCss={'rgba(103, 111, 129, .5)'}
              borderColor={'#2e323c'}
              borderErrorColor={'#E94747'}
              borderRadius={2}
              placeholder="Email"
              rules={{
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              }}
              setVal={() => {
                setValue('email', '', { shouldValidate: true });
              }}
              isError={errors && !!errors.email}
              control={control}
            />

            <ErrorFlexWrap>
              {errors.email && errors.email.type === 'required' ? (
                <ErrorWrap>Please input correct E-Mail address</ErrorWrap>
              ) : null}
              {errors.email && errors.email.type === 'pattern' ? (
                <ErrorWrap>Please input correct E-Mail address</ErrorWrap>
              ) : null}
            </ErrorFlexWrap>
          </InputWrap>

          <InputWrap>
            <div className="label">Input mobile</div>
            <FormInput
              name="mobile"
              type={'text'}
              isClear={true}
              padding={'12px 34px 12px 12px'}
              txtColor={'#000'}
              txtFontSize={'13px'}
              inputBackground={'#ffffff'}
              placeholderCss={'rgba(103, 111, 129, .5)'}
              borderColor={'#2e323c'}
              borderErrorColor={'#E94747'}
              borderRadius={2}
              placeholder="Mobile"
              rules={{
                required: true,
                pattern: /^1[3-9]\d{9}$/g,
              }}
              setVal={() => {
                setValue('mobile', '', { shouldValidate: true });
              }}
              isError={errors && !!errors.mobile}
              control={control}
            />

            <ErrorFlexWrap>
              {errors.mobile ? <ErrorWrap>Please input correct mobile number</ErrorWrap> : null}
            </ErrorFlexWrap>
          </InputWrap>

          <SubmitButton
            className={Object.keys(errors).length > 0 ? 'errored' : ''}
            type="submit"
            disabled={Object.keys(errors).length > 0}>
            Confirm
          </SubmitButton>
        </form>
      </FormWrap>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(ModalContainer)``;

const FormWrap = styled.div`
  height: auto;
  padding: 27px 36px;
  box-sizing: border-box;
  border-radius: 8px;

  .password-tips {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #8c8d97;
    text-align: left;
    margin-bottom: 24px;
  }
`;

const Title = styled.h2`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */

  display: flex;
  align-items: center;

  color: #ffffff;
  margin-bottom: 50px !important;
`;

const InputWrap = styled.div<{ hide?: boolean }>`
  width: 100%;
  /* height: 40px; */
  position: relative;
  display: ${(props) => (props.hide ? 'none' : 'block')};
  /* margin-bottom: 24px; */

  .label {
    color: #fff;
    text-align: left;
    margin-bottom: 12px;
  }
`;

const ErrorWrap = styled.p`
  color: #e94747;
  font-size: 12px;
  line-height: 12px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 36px;
  text-align: center;
  line-height: 40px;
  background: linear-gradient(90deg, #0053d7 8.93%, #498fff 100%);
  box-shadow: 0px 3px 8px rgba(0, 77, 199, 0.2);
  border: 0;
  cursor: pointer;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  line-height: 12px;
  outline: none;

  &.errored {
    background-color: #e5e5e5;
  }

  &:hover {
    background: linear-gradient(270deg, #63b4ff 0%, #1266ee 100%);
    box-shadow: 0px 3px 8px rgba(0, 77, 199, 0.2);
  }
`;

const ErrorFlexWrap = styled.div`
  display: flex;
  width: 100%;
  min-height: 24px;
`;

export default ProfileModal;
