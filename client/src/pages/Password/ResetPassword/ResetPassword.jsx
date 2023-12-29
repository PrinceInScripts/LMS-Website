import { useDispatch } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { isValidPassword } from "../../../helpers/regexmater";
import toast from "react-hot-toast";
import { resetPassword } from "../../../redux/slices/authSlice";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    resetToken: useParams().resetToken,
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    console.log(data.password);
    console.log(data.confirmPassword);
    console.log(data.resetToken);

    if (!data.password || !data.confirmPassword || !data.resetToken) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isValidPassword(data.password)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Both password should be same");
      return;
    }

    const response = await dispatch(resetPassword(data));

    if (response?.payload?.success) {
      navigate("/signin");
    }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-10 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Reset Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="password">
              New Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.confirmPassword}
              onChange={handleUserInput}
            />
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ResetPassword;
