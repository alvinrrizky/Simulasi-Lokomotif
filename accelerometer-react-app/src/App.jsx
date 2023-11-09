import * as React from 'react'
import {
  Box,
  Container,
  Grid,
  VStack,
  GridItem,
  Stack,
  Text,
  HStack,
  Avatar,
  AvatarBadge,
  Button
} from '@chakra-ui/react'
import ColumnBarComp from './components/ColumnBarComp'
import TotalLocomotiveComp from './components/TotalLocomotiveComp'
import SplineAreaBarComp from './components/SplineAreaBarComp'
import TableDashboardComp from './components/TableDashboardComp'
import { useQuery, QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { fetchingSummarylatest, fetchingSummaryAll } from "./apis/api"
import { InfoOutlineIcon } from '@chakra-ui/icons'

const getSummaryLatest = async () => {
  const response = fetchingSummarylatest()
  return response
}

const getSummaryAll = async (orderBy, page = 0) => {
  const response = fetchingSummaryAll(orderBy, page)
  return response
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery("latest", () => getSummaryLatest()),
    queryClient.prefetchQuery("allDesc", () => getSummaryAll("Desc")),
    queryClient.prefetchQuery("allASc", () => getSummaryAll("Asc")),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function App() {
  const [page, setPage] = React.useState(0)

  const { data: dataLatest, isError: isErrorLatest, isLoading: isLoadingLatest, isFetching: isFetchingLatest, isSuccess: isSuccessLatest } = useQuery("latest", () => getSummaryLatest(), {
    refetchInterval: 3600000
  });
  
  const { data: dataAllDesc, isError: isErrorAllDesc, isLoading: isLoadingAllDesc, isFetching: isFetchingAllDesc, isSuccess: isSuccessAllDesc } = useQuery(["allDesc", page], () => getSummaryAll("Desc", page), {
    refetchInterval: 3600000
  });

  const { data: dataAllAsc, isFetching: isFetchingAllAsc, isSuccess: isSuccessAllAsc } = useQuery("allAsc", () => getSummaryAll("Asc"), {
    refetchInterval: 3600000
  });

  const nextPage = () => {
    setPage((old) => old + 1)
  }
  
  const previousPage = () => {
    setPage((old) => old - 1)
  }
  
  return (
    <>
      <Box my={5}>
        <Container maxW="95%">
          <HStack justifyContent="space-between">
            <Text color='yellow.400' fontWeight={700} fontSize={25}>Dashboard<Text color='blue.400' as='span'>LOCO</Text></Text>
            <HStack>
              <Text fontSize={15} fontWeight={600}>alvin_123</Text>
              <Avatar size='sm'>
                <AvatarBadge boxSize='1.25em' bg='green.500' />
              </Avatar>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <VStack justifyContent='space-between'>
        <Container maxW="90%">
        <HStack mt={10} mb={5} bgColor={'blue.400'} w="100%" borderRadius={10} justifyContent='center'>
        <InfoOutlineIcon boxSize={5} color='#FFFFFF'/><Text py={3} color='white' fontWeight={500} fontSize={15}> Project Locomotive with NodeJs, Kafka, MongoDB, MYSQL, Logging and Telegram Notifs</Text>
        </HStack>
          <Stack gap={10}>
            <VStack>
              <Grid
                h='500px'
                w='100%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={10}
              >
                <GridItem borderRadius={20} rowSpan={2} colSpan={2} bg='white' border="3px solid #f0f0f0" >
                  <SplineAreaBarComp data={dataAllAsc} isFetching={isFetchingAllAsc} isSuccess={isSuccessAllAsc}/>
                </GridItem>
                <GridItem borderRadius={20} rowSpan={1} bg='#F2BE42' >
                <TotalLocomotiveComp data={dataLatest} isError={isErrorLatest} isLoading={isLoadingLatest} isFetching={isFetchingLatest} isSuccess={isSuccessLatest}/>
                </GridItem>
                <GridItem borderRadius={20} rowSpan={1} bg='#3CBA78' >
                  <ColumnBarComp data={dataLatest} isError={isErrorLatest} isLoading={isLoadingLatest} isFetching={isFetchingLatest} isSuccess={isSuccessLatest}/>
                </GridItem>
              </Grid>
            </VStack>
            <TableDashboardComp data={dataAllDesc} isError={isErrorAllDesc} isFetching={isFetchingAllDesc} isLoading={isLoadingAllDesc} isSuccess={isSuccessAllDesc}/>
            <HStack justifyContent="end" gap={6} mb={10}>
              <Button onClick={previousPage} isDisabled={page === 0}>Prev</Button>
              <Text>{page + 1}</Text>
              <Button onClick={nextPage} isDisabled={isFetchingAllDesc || !dataAllDesc || dataAllDesc.length <= 10}>Next</Button>
          </HStack>
          </Stack>
        </Container>
        <Box bgColor='#20324D' w='100%' textAlign='center' py={3} color='#FFFFFF'>
          <Text fontWeight={700}>Copyright &copy; By Alvin Andrian Rizki</Text>
        </Box>
      </VStack>
    </>
  )
}
