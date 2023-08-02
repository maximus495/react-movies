import Authtemplate from '../../../templates/AuthTemplate/Authtemplate';
import { useLogin } from '../Login/hooks/useLogin';

const ForgotPassword = () => {
    const { handleNavigateDashboard, Email } = useLogin();
    return (
        <Authtemplate> 
            FORGOT PASSWORD
            {Email}
            <button onClick={handleNavigateDashboard}>VOY A DASHBOARD </button>
        </Authtemplate>
    );
};

export default ForgotPassword;