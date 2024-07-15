import { axiosInstance } from "../axios/axiosDefaults"

export const followHelper = async (id) => {
  try {
    await axiosInstance.post(`followers/`, {followed: id})
    console.log("successfully followed user", id)
  } catch (error) {
    console.log("error when following user", error)
  }
}

export const unfollowHelper = async (id) => {
  try {
    await axiosInstance.delete(`followers/${id}`)
    console.log("successfully unfollowed user", id)
  } catch (error) {
    console.log("error when unfollowing user", error)
  }
}