import { Form, useActionData, useNavigation } from "react-router-dom";
import { FormSelect } from "../../components/form";

type ApiLoginResponse = {
	message: string,
	errors?: Array<string>,
	token?: string,
}

const LoginPage: React.FC = () => {
    const data = useActionData() as ApiLoginResponse;
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

	return (
        <div className="min-h-screen flex">
            <div className="hidden md:block md:w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700"></div>
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
                <div className="p-8 max-w-md w-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo de volta!</h2>
                    <Form method="post" className="space-y-4">
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
                        <div>
                            {(data && data.errors) && data.errors.map((error, index) => {
                                return (<p key={index} className="text-xs text-red-500 p-2">{error}</p>);
                            })}
                            {(data && !data.errors && data.message) && <p className="text-xs text-red-500 p-2">{data.message}</p> }
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-700" disabled={isSubmitting}>
                            {isSubmitting ? 'Entrar...' : 'Entrar'} 
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
