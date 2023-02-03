import { NextPage } from "next"

export interface FetchedDataProps {
  isQueryingData: boolean,
  isError: boolean,
  isValidData: boolean,
  childrenQueryingData: React.ReactNode,
  childrenValidData: React.ReactNode,
  childrenInvalidData: React.ReactNode,
  childrenError: React.ReactNode
}
const FetchedData: React.FC<FetchedDataProps> = (
  { isQueryingData, isError, isValidData, childrenQueryingData, childrenValidData, childrenInvalidData, childrenError }
) => {
  
  
  if(isQueryingData) {
    return (
      <>
        {childrenQueryingData}
      </>
    )
  }
  if(isError) {
    return(
      <>
        {childrenError}
      </>
    )
  }
  if(!isValidData) {
    return(
      <>
        {childrenInvalidData}
      </>
    )
  }
  return (
    <>
      {childrenValidData}
    </>
  )
}

export default FetchedData;