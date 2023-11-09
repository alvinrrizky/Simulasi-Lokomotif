import {
    HStack,
    VStack,
    Text,
    Spinner
} from '@chakra-ui/react';
import { SpinnerIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types';

TotalLocomotiveComp.propTypes = {
    data: PropTypes.shape({
        totalLocomotive: PropTypes.number,
    }),
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    isFetching: PropTypes.bool,
    isSuccess: PropTypes.bool
};

export default function TotalLocomotiveComp({ data, isError, isLoading, isFetching, isSuccess }) {
    return (
        <HStack justifyContent='center' h='100%' gap={10}>
            {isFetching && (
                <Spinner color="blue.500" position="fixed" top={10} right={10} />
            )}
            <VStack align="flex-start">
                <Text fontWeight={700} fontSize={17} color='#FFFFFF'>TOTAL LOCOMOTIVE</Text>
                {isLoading && (
                    <Text fontWeight={700} fontSize={20} color='#FFFFFF'>Loading...</Text>
                )}
                {isError && (
                    <Text fontWeight={400} fontSize={20} color='#FFFFFF'>Fetching Error</Text>
                )}
                {isSuccess && (
                    <Text fontWeight={400} fontSize={40} color='#FFFFFF'>{data.totalLocomotive}</Text>
                )}
            </VStack>
            <SpinnerIcon color="#FFFFFF" fontSize={100}/>
        </HStack>
    )
}