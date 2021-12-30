import React,{useState} from "react";
import { View,Text } from "react-native";


const ListView=(props)=>{

    const [data,setData]=useState('')
    // setData(props.route.params.address)
    return(
        <View>
       {props.route.params.address!== undefined ?<Text>  
        {props.route.params.address}
        </Text> : null } 
    </View>
    )
    
}

export default ListView;