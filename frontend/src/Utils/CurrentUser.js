
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/Firebase/firebase";
import { fetchUser, startLoading } from "@/lib/Features/userSlice";

const CurrentUser = () => {
    const { user } = useSelector(state => state.user);
    // const {page,ItemLimit}=useSelector(state=>state.menu)
    const  dispatch  = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
          if (currentUser?.email) {
            dispatch(fetchUser(currentUser.email))
          } else {
            localStorage.removeItem("userToken")
            dispatch(startLoading(false))
            // dispatch(toggleLoading())
          }
        })
      }, [dispatch, user?.token])
};

export default CurrentUser;