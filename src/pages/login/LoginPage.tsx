import { useNavigate } from "react-router-dom";
import { FormContainer, FormSelect } from "../../components/form";
import { FormEvent, useState } from "react";
import { login, LoginDataRequest } from "../../features/auth";
import { toastError } from "../../utils/toast";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const onSubmitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        
        const request: LoginDataRequest = {
            email: data.email as string,
            password: data.password as string,
            year: data.year as string
        };

        try {
            setIsSaving(true);
            
            const result = await login(request);
            

            const token = result.token;
            localStorage.setItem('token', token);
            // TODO:: Implement expiration
            //localStorage.setItem('expiration', '');
            
            navigate('/');
        } catch (error) {
            setIsSaving(false);
            if (error instanceof Error) {
                toastError(error.message);
            } else {
                toastError("Ocurreu um erro ao gravar a equipa, por favor tente mais tarde ou contacte o administrador.");
            }
        }
    };

	return (
        <div className="min-h-screen flex">
            <div className="hidden md:block md:w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700"></div>
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
                <div className="p-8 max-w-md w-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo de volta!</h2>
                    <FormContainer onSubmitForm={onSubmitFormHandler}> 
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 pb-1"> Email </label>
                            <input type="email" id="email" name="email" className="w-full border border-gray-300 p-2 rounded-lg" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 pb-1"> Palavra-passe </label>
                            <input type="password" id="password" name="password" className="w-full border border-gray-300 p-2 rounded-lg" required />
                        </div>
                        <FormSelect 
                            label="Ano" 
                            id="year" 
                            containerClassesNames=""
                            labelClassesNames="block text-sm font-medium text-gray-700 pb-1"
                            inputClassesNames="w-full border border-gray-300 p-2 rounded-lg cursor-pointer"
                            defaultSelectedOptionId="1"
                            options={[{id: '1', text: '2024/2025'}, {id: '2', text: '2025/2026'}]} 
                            />
                        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-700" disabled={isSaving}>
                            {isSaving ? 'Entrar...' : 'Entrar'} 
                        </button>
                    </FormContainer>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
