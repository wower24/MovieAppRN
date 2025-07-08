import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'

const profile = () => {
  return (
    <View className='bg-primary flex-1'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mx-auto"
      />
      <View className='flex items-center flex-1 flex-col gap-5 mt-20'>
        <Image
          source={icons.person}
          className="size-20"
          tintColor="#FFF"
        />
        <Text className="text-light-200 font-normal text-xl">
          Username
        </Text>
      </View>

    </View>
  )
}

export default profile