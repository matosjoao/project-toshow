import { redirect } from "react-router-dom";

// TODO:: Refactor
export const action = async ({ request }: { request: Request }) => {
    const data = await request.formData();
  
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
        year: data.get('year'),
        device: 'web-token'
    };
  
    const response = await fetch('http://127.0.0.1:8000/api/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 401 || response.status === 422) {
        return response;
    }

    if (!response.ok ) {
        // TODO:: Use error boundry
        return response;
    }
    
    const resultData = await response.json();
    const token = resultData.token;
    localStorage.setItem('token', token);
    // TODO:: Implement expiration
    //localStorage.setItem('expiration', '');

    return redirect('/');
};