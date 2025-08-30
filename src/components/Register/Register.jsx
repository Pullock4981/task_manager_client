import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();
    const { createUser, googleSignIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    // 🔹 Add user to backend
    const addUserToDB = async (user) => {
        try {
            await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.displayName || user.name,
                    email: user.email,
                    photoURL: user.photoURL || user.photoURL,
                }),
            });
        } catch (err) {
            console.error("Failed to save user:", err);
        }
    };

    // 🔹 Register with Email & Password
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...rest } = Object.fromEntries(formData.entries());

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setLoading(false);
            return Swal.fire(
                "Invalid Password",
                "Password must be at least 6 characters and include both uppercase and lowercase letters.",
                "error"
            );
        }

        createUser(email, password)
            .then((res) => {
                setLoading(false);
                console.log("User created:", res.user);

                addUserToDB({ ...rest, ...res.user });

                Swal.fire({
                    title: "Success 🎉",
                    text: "Account created successfully!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });

                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire("Oops!", error.message, "error");
            });
    };

    // 🔹 Google Sign In
    const handleSignInWithGoogle = () => {
        setLoading(true);
        googleSignIn()
            .then((result) => {
                setLoading(false);
                console.log("Google User:", result.user);

                addUserToDB(result.user);

                Swal.fire({
                    title: "Welcome 🎉",
                    text: "Signed in with Google!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });

                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire("Oops!", error.message, "error");
            });
    };

    return (
        <div className="flex justify-center items-center py-10 bg-base-200 px-4">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleRegister} className="form-control w-full space-y-3">
                        <h1 className="text-3xl text-center mb-3 font-bold">Register Now</h1>

                        <div>
                            <label className="label">Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                name="name"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Photo URL</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                name="photoURL"
                                placeholder="Photo URL"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                name="password"
                                placeholder="Password"
                                required
                                minLength={6}
                            />
                            <small className="text-gray-500">
                                Password must include uppercase, lowercase & be at least 6 characters.
                            </small>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-block bg-primary text-white font-bold hover:opacity-90"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>

                        <p className="text-center">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 font-semibold underline hover:no-underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleSignInWithGoogle}
                        className="btn btn-block bg-white text-black border border-gray-300 hover:shadow-md"
                        disabled={loading}
                    >
                        <svg
                            aria-label="Google logo"
                            width="20"
                            height="20"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="#EA4335"
                                d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                            />
                            <path
                                fill="#FBBC05"
                                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                            />
                            <path
                                fill="#34A853"
                                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                            />
                            <path
                                fill="#4285F4"
                                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                            />
                        </svg>
                        <span className="ml-2">Sign up with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
