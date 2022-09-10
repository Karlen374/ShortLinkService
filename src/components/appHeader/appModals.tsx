import { useAppSelector } from 'src/hooks/hooks';
import Modal from 'src/components/modal/modal';
import SignInForm from 'src/components/signInForm/signInForm';
import SignUpForm from 'src/components/signUpForm/SignUpForm';

const AppModals = () => {
  const { signUpModal, signInModal } = useAppSelector((store) => store.shortLink);
  return (
    <>
      <Modal active={signInModal}>
        <SignInForm />
      </Modal>
      <Modal active={signUpModal}>
        <SignUpForm />
      </Modal>
    </>
  );
};
export default AppModals;
