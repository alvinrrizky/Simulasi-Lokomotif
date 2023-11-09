import {
    Box,
    Text,
    Spinner
} from '@chakra-ui/react'
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

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

SplineAreaBarComp.propTypes = {
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
    isFetching: PropTypes.bool,
    isSuccess: PropTypes.bool
};

export default function SplineAreaBarComp({ data, isFetching, isSuccess }) {
    const recentData = data ? data.slice(0, 5) : [];

    const timestampsCategories = recentData.map(item => formatTimestamp(item.timestamps));
    const totalBeroperasi = recentData.map(item => item.totalBeroperasi);
    const totalDiperbaiki = recentData.map(item => item.totalDiperbaiki);
    const totalDitangguhkan = recentData.map(item => item.totalDitangguhkan);

    const options = {
        chart: {
            id: 'spline-area',
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: timestampsCategories,
            axisBorder: {
                show: false, 
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            }
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        fill: {
            type: 'solid',
            colors: ['transparent'],
        },
        stroke: {
            curve: 'smooth',
            lineCap: 'round', 
        },
        legend: {
            position: 'top',
        }
    };

    const series = [
        {
            name: 'Beroperasi',
            data:  totalBeroperasi
        },
        {
            name: 'Diperbaiki',
            data: totalDiperbaiki
        },
        {
            name: 'Ditangguhkan',
            data: totalDitangguhkan
        }
    ];

    return (
        <Box px={18}>
            {isFetching && (
                <Spinner color="blue.500" position="fixed" top={10} right={10} />
            )}
            <Text mt={5} color="#FFFFFF" fontWeight={700}>TOTAL STATUS LOCOMOTIVE</Text>
            {isSuccess && (
                <ReactApexChart options={options} series={series} type="area" height={420} />
            )}
        </Box>
    )
}