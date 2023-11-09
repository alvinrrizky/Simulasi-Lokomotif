import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    Box,
    Spinner,
    Skeleton
} from '@chakra-ui/react'
import PropTypes from 'prop-types';

TableDashboardComp.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          timestamps: PropTypes.string,
          totalLocomotive: PropTypes.number,
          totalBeroperasi: PropTypes.number,
          totalDiperbaiki: PropTypes.number,
          totalDitangguhkan: PropTypes.number
        })
    ),
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    isFetching: PropTypes.bool,
    isSuccess: PropTypes.bool
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    return formattedDate;
};

export default function TableDashboardComp({ data, isError, isLoading, isFetching, isSuccess }) {
    let nomor = 0;

    return (
        <Box border="3px solid #f0f0f0" borderRadius={20} p={10}>
            {isFetching && (
                <Spinner color="blue.500" position="fixed" top={10} right={10} />
            )}
            <Text fontSize={30} fontWeight={400} p={5}>List Report Table</Text>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>TimeStamp</Th>
                            <Th isNumeric>beroperasi</Th>
                            <Th isNumeric>Diperbaiki</Th>
                            <Th isNumeric>Ditangguhkan</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {isLoading && (
                        <Tr>
                            <Td colSpan={6}>
                                <Skeleton height='30px' />
                            </Td>
                        </Tr>
                    )}
                    {isError && (
                        <Tr>
                            <Td colSpan={6} textAlign="center">
                                <Text>Fetching Error</Text>
                            </Td>
                        </Tr>
                    )}
                    {isSuccess && data?.map(item => (
                        <Tr key={item.id}>
                            <Td>{++nomor}</Td>
                            <Td>{formatTimestamp(item.timestamps)}</Td>
                            <Td isNumeric>{item.totalBeroperasi}</Td>
                            <Td isNumeric>{item.totalDiperbaiki}</Td>
                            <Td isNumeric>{item.totalDitangguhkan}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}