import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image 
        source={icons.person} 
        className="size-10"
        tintColor="#FFF" 
        />
        <Text className="text-white font-normal text-xl">
          TODO: Profile Page
        </Text>
      </View>
      
    </View>
  )
}

export default profile