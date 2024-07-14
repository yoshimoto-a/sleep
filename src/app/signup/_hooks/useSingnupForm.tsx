import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

export const useSignupForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const valid = () => {
    let isValid = true;
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "メールアドレスは必須です。";
      isValid = false;
    } else if (!email.match(/.+@.+\..+/)) {
      emailError = "メールアドレスの形式が正しくありません。";
      isValid = false;
    }
    if (!password) {
      passwordError = "パスワードは必須です。";
      isValid = false;
    } else if (password.length < 6) {
      passwordError = "パスワードは6文字以上で入力してください。";
      isValid = false;
    }

    setEmailErrorMessage(emailError);
    setPasswordErrorMessage(passwordError);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!valid()) {
      setIsSubmitting(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      },
    });
    if (error) {
      if (error.status === 422) {
        alert("登録済のメールアドレスです");
      } else {
        alert("登録に失敗しました");
      }
    } else {
      setEmail("");
      setPassword("");
      router.push("/signup/sentEmail/");
    }
    setIsSubmitting(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordErrorMessage,
    emailErrorMessage,
    isSubmitting,
    handleSubmit,
  };
};
