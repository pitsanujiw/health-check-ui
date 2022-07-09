import { Grid, Box, LinearProgress, Typography } from '@mui/material'

import svgImg from '../../image/csv.png'

interface HealthCheckerProgressProps {
    file: File
    progress: number
}

function HealthCheckerProgress(props: HealthCheckerProgressProps) {
    const { file, progress } = props
    return <Grid mt={2} container sx={{ boxShadow: 1, borderRadius: '5px', padding: '0.5rem', width: 500 }}>
        <Grid item xs={2}>
            <img src={svgImg} height="50px" alt="svg" />
        </Grid>
        <Grid item xs={9} style={{
            width: 300
        }}>
            <Grid>
                {file?.name}
            </Grid>
            <Grid>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={progress} style={{
                            padding: '7px',
                            borderRadius: '5px',
                        }} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`${Math.round(
                            progress,
                        )}%`}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Grid>
}

export default HealthCheckerProgress