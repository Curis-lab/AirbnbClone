import { useRouter } from "next/navigation"
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { SafeUser } from "../types";

interface IUseFavorite{
    listingId: string,
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}:IUseFavorite)=>{
    
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    },[currentUser, listingId]);

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }
        try{
            let request;
            if(hasFavorited){
                request = ()=> axios.delete(`/api/favorites/${listingId}`);
            }else{
                request = ()=> axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
        }catch(error){
            console.log(error);
        }
    },[
        currentUser,
        hasFavorited,
        listingId,
        loginModal,
        router
    ]);

    return{
        hasFavorited, 
        toggleFavorite
    }
}


export default useFavorite;