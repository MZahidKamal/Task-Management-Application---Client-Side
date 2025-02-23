import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import AuthContext from "./AuthContext.jsx";
import auth from "../Firebase/firebase.init.js";
import {toast} from "react-toastify";
import {BASE_URL} from "../SharedUtilities/SharedUtilities.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const navigate = useNavigate();


    const checking_user_availability_in_database = async (email) => {
        // console.log(email)
        const response = await axios.post(
            `${BASE_URL}/users/find_availability_by_email`,
            { email: email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response?.data;
    }


    const signUpNewUser = async (full_name, email, password) => {
        try {
            setUserLoading(true);

            const user_availability_in_database = await checking_user_availability_in_database(email);
            if (user_availability_in_database?.exists) {
                toast.warning(user_availability_in_database?.message);
                setUserLoading(false);
                navigate('/sign-in');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);

            await updateProfile(auth.currentUser, {
                displayName: full_name,
                photoURL: 'https://avatar.iran.liara.run/public'
            });

            const userInfoForDatabase = {
                uid: auth.currentUser.uid,                      //Generated by and coming from Firebase.
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
                joinDate: new Date().toISOString(),
                createdTasks: [],                               //Array of task ids created by this user.
            };
            // console.log('userInfoForDatabase: ', userInfoForDatabase);

            const response = await axios.post(
                `${BASE_URL}/users/add_new_user`,
                {newUser: userInfoForDatabase},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // console.log('response: ', response?.data);

            if (response?.data?.status === 201) {
                toast.success(response?.data?.message);
                await signOut(auth);
            }
        }
        catch (error) {
            toast.error(`Registration failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    const signInExistingUsers = async (email, password) => {
        try {
            setUserLoading(true);

            const user_availability_in_database = await checking_user_availability_in_database(email);
            if (!user_availability_in_database?.exists) {
                toast.warning('Sign in failed. Email address not exists!');
                setUserLoading(false);
                navigate('/sign-up');
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // console.log(userCredential)

            if (userCredential){
                const response = await axios.post(
                    `${BASE_URL}/users/get_user_by_email`,
                    { email: email },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // console.log('Response: ', response?.data?.data);

                await setUser(response?.data?.data);
                toast.success(response?.data?.message);
            }
        }
        catch (error) {
            toast.error(`Login failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    const updateExistingUsers = async (name, photoUrl) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            });
            // console.log(auth.currentUser)

            if (auth.currentUser){

                const response = await axios.patch(
                    `${BASE_URL}/users/update_existing_user`,
                    {
                        email: auth.currentUser.email,
                        displayName: auth.currentUser.displayName,
                        photoURL: auth.currentUser.photoURL,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // console.log(response?.data?.updatedUser);

                if (response?.data?.result?.modifiedCount > 0) {
                    setUser(response?.data?.updatedUser);
                    toast.success('Profile updated successfully!');
                }
            }
        } catch (error) {
            toast.error(`Profile update failed. Error: ${error.message}`);
        }
    };


    const signOutCurrentUser = async () => {
        try {
            await signOut(auth);

            setUser(null);
            toast.success('Logout successful!');

        } catch (error) {
            toast.error(`Logout failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);

            toast.success('Password reset email sent!');

        } catch (error) {
            toast.error(`ERROR MESSAGE: ${error.code}: ${error.message}`);
        }
    };


    const provider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            setUserLoading(true);

            const userCredential = await signInWithPopup(auth, provider);
            console.log(userCredential);

            const user_availability_in_database = await checking_user_availability_in_database(userCredential?.user?.email);

            if (!user_availability_in_database?.exists) {
                const userInfoForDatabase = {
                    uid: userCredential?.user?.uid,                      //Generated by and coming from Firebase.
                    displayName: userCredential?.user?.displayName,
                    email: userCredential?.user?.email,
                    photoURL: userCredential?.user?.photoURL,
                    joinDate: new Date().toISOString(),
                    createdTasks: [],                               //Array of task ids created by this user.
                };
                // console.log('userInfoForDatabase: ', userInfoForDatabase);

                const response = await axios.post(
                    `${BASE_URL}/users/add_new_user`,
                    {newUser: userInfoForDatabase},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // console.log('response: ', response.status);

                if (response?.status !== 201) {
                    new Error('Sign In using Google completed but saving into database failed!');
                }
            }


            const response = await axios.post(
                `${BASE_URL}/users/get_user_by_email`,
                { email: userCredential?.user?.email },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // console.log('response: ', response.data);

            await setUser(response?.data?.data);

            toast.success('Sign In using Google completed successfully!');
        }
        catch (error) {
            toast.error(`Sign In using Google failed. Error: ${error.message}`);
        }
        finally {
            setUserLoading(false);
        }
    };


    /* THIS OBSERVER IS CREATED ACCORDING TO THE FIREBASE DOCUMENT, INCLUDING DEPENDENCIES */
    useEffect(() => {
        // Setting up the Firebase observer for auth state
        const authentication_State_Observer = onAuthStateChanged(auth, async (currentUser) => {
            setUserLoading(true); // Set loading to true initially

            if (currentUser) {
                try {
                    // Fetch user data from your server and then set to state
                    const userResponse = await axios.post(
                        `${BASE_URL}/users/get_user_by_email`,
                        { email: currentUser?.email },
                        {
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    // console.log("User data:", userResponse?.data);
                    setUser(userResponse?.data?.data);

                    // Fetch server generated JWT token
                    const tokenResponse = await axios.post(
                        `${BASE_URL}/generate_jwt_and_get_token`,
                        { email: currentUser?.email },
                        {
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    // console.log("JSON Web Token:", tokenResponse?.data);
                    console.log("JSON Web Token created and saved. User is logged in.");
                }
                catch (error) {
                    console.error("Error during authentication flow:", error);
                    setUser(null); // Reset user on error
                }
                finally {
                    setUserLoading(false); // Set loading to false after everything is complete
                }
            } else {
                // User is logged out

                // Fetch server generated JWT token
                const tokenClearResponse = await axios.post(
                    `${BASE_URL}/logout_and_clear_jwt`,
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // console.log("JSON Web Token Cleared:", tokenClearResponse?.data);
                console.log("JSON Web Token Cleared. User is logged out.");

                setUser(null);
                setUserLoading(false); // Set loading to false
            }
        });

        // Cleanup function OR Component Unmounting.
        return () => {
            authentication_State_Observer();
        };
    }, []);


    const authInfo = {user, userLoading, signUpNewUser, signInExistingUsers, updateExistingUsers, signOutCurrentUser, resetPassword, signInWithGoogle};


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;
