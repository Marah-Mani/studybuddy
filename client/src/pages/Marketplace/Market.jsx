import React, { useState } from 'react'
import Header from '../../components/layout/Header'
import { Grid, List } from '@mui/material'
import Title from '../../components/shared/Title'
import Marketrightbar from '../../components/specific/Marketrightbar'
import Lists from '../../components/shared/Lists'

const Market = () => {

    const [category, setCategory] = useState("All");
    const [change, setChange] = useState(false);

    return (
        <>
            <Title title='Market Place' description='Market Place of Study buddy' />
            <Header />
            <Grid container height={"calc(100vh - 4rem)"}>
                <Grid item  height={"100%"} xs={11.4} sm={11.4} md={11.4} lg={11.4}>
                    <Lists change={{ change, setChange }} category={category} />
                </Grid>
                <Grid item md={0.6} lg={0.6} sx={{ bgcolor: "rgba(0,0,0,0.85)", }}                >
                    <Marketrightbar change={{ change, setChange }} setter={setCategory} />
                </Grid>
            </Grid>
        </>
    )
}



export default Market