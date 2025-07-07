import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const saved = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
          <View className='flex justify-center items-center flex-1 flex-col gap-5'>
            <Image 
            source={icons.save} 
            className="size-10"
            tintColor="#FFF" 
            />
            <Text className="text-white font-normal text-xl">
              TODO: Saved Page
            </Text>
          </View>
          
        </View>
  )
}

export default saved