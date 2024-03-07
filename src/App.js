import { ZodError, z } from 'zod';
import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(null);


  const FormData = z.object({
    email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
    password: z.string().min(8, { message: "8文字以上入力してください。" }).max(32, { message: "32文字以下で入力してください。" })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      FormData.parse(data);
      console.log(data);
    } catch (e) {
      if (e instanceof ZodError) {
        setErrors(e.flatten().fieldErrors);
        console.log(e);
      } else {
        console.log(e);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="App">

      <h1>ログイン</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        {errors?.email && <div>{errors.email}</div>}

        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
          />
        </div>

        {errors?.password && <div>{errors.password}</div>}

        <div>
          <button type="submit">ログイン</button>
        </div>

      </form>
    </div>
  );
}

export default App;
