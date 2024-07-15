import { axiosInstance } from "../axios/axiosDefaults";

export const FetchNext = async (state, setState) => {
  try {
    const { data } = await axiosInstance.get(state.next);
    setState((prevState) => ({
      ...prevState,
      results: [...prevState.results, ...data.results],
      next: data.next,
    }));
    return state;
  } catch (error) {
    console.log("Error when fetching more data:", error);
    return "Something went wrong when loading more data";
  }
};
