import ProtectedComponent from "../components/HOC/auth";
import NewPasswordComponent from "../components/new-pass/new-pass";

export default function NewPass() {
  return (
    <ProtectedComponent>
      <NewPasswordComponent />
    </ProtectedComponent>
  );
}
