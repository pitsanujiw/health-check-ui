import { Grid, Typography } from '@mui/material'

interface HealthCheckerResultProps {
    healthChecker: TotalChecker
}

function HealthCheckerResult(props: HealthCheckerResultProps) {
    const { healthChecker } = props

    return (
        <Grid mt={2} container sx={{ boxShadow: 1, borderRadius: '5px', padding: '0.5rem', width: 500 }}>
            <Grid>
                <Typography variant='h5'>
                    Total {healthChecker.totalWebsite} {healthChecker.totalWebsite > 1 ? "Websites" : "Website"}
                </Typography>
            </Grid>
            <Grid>
                <Typography variant='h6'>
                    Use {healthChecker.totalTimeMin} {healthChecker.totalTimeMin > 1 ? "minutes" : "minute"} {healthChecker.totalTimeSec} {healthChecker.totalTimeSec > 1 ? 'seconds' : 'second'} {healthChecker.totalTimeMiniSec} {healthChecker.totalTimeMiniSec > 1 ? 'Milliseconds' : 'Millisecond'}
                </Typography>
            </Grid>
            <Grid container spacing={1} mt={2}>
                <Grid item xs sx={{ boxShadow: 1, borderRadius: '5px', padding: '0.5rem', backgroundColor: "#3FE364", color: "white" }} ml={2}>
                    <Grid>
                        <Typography variant="h6">
                            UP
                        </Typography>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h2" style={{ fontWeight: 'bold' }}>
                            {healthChecker.success}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs sx={{ boxShadow: 1, borderRadius: '5px', padding: '0.5rem', backgroundColor: "#F5F7FC", color: "#64697F" }} ml={2}>
                    <Grid>
                        <Typography variant="h6">
                            DOWN
                        </Typography>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h2" style={{ fontWeight: 'bold' }}>
                            {healthChecker.failure}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HealthCheckerResult