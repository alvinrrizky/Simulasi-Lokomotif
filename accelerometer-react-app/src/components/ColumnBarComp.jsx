import { 
    Box,
    Text, 
    Spinner, 
    Skeleton
} from '@chakra-ui/react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

ColumnBarComp.propTypes = {
    data: PropTypes.shape({
        totalBeroperasi: PropTypes.number,
        totalDiperbaiki: PropTypes.number,
        totalDitangguhkan: PropTypes.number
    }),
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    isFetching: PropTypes.bool,
    isSuccess: PropTypes.bool
};

export default function ColumnBarComp({ data, isError, isFetching, isLoading, isSuccess }) {
    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: ['Beroperasi', 'Diperbaiki', 'Ditangguhkan'],
            labels: {
                style: {
                  colors: '#ffffff',
                  fontWeight: 'bold'
                },
              },
            axisBorder: {
                show: false, 
              },
              axisTicks: {
                show: false,
              },
        },
        plotOptions: {
            bar: {
              borderRadius: 10, 
            },
          },
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
        },
    };

    let series = [
        {
            name: 'Total Locomotive',
            data: [],
            color: '#FFFFFF',
        },
    ];

    if (data?.totalBeroperasi !== undefined && data?.totalDiperbaiki !== undefined && data?.totalDitangguhkan !== undefined) {
        series = [
            {
                name: 'Total Locomotive',
                data: [data.totalBeroperasi, data.totalDiperbaiki, data.totalDitangguhkan],
                color: '#FFFFFF',
            },
        ];
    }
    

    return (
        <Box px={18} h='100%'>
            {isFetching && (
                <Spinner color="blue.500" position="fixed" top={10} right={10} />
            )}
            <Text mt={5} color="#FFFFFF" fontWeight={700}>TOTAL STATUS LOCOMOTIVE</Text>
            {isLoading && (
                <Skeleton mt={3} height='150px' />
            )}
            {isError && (
                 <Text fontWeight={400} fontSize={40} color='#FFFFFF' textAlign='center' mt={10}>Fetching Error</Text>
            )}
            {isSuccess && (
                <ReactApexChart options={options} series={series} type="bar" height={200} />
            )}
        </Box>
    );
}
