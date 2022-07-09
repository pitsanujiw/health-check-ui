import { Grid, Typography, FormControl, Box, Button } from '@mui/material'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import HealthCheckerProgress from '../../components/HealthCheckerProgress'
import HealthCheckerResult from '../../components/HealthCheckerResult'

import svgImg from '../../image/csv.png'
import { uploadCSVFileByFormData } from '../../utils/http'

function HomePage() {
    const [progress, setProgress] = useState<number>(0)
    const [result, setResult] = useState<TotalChecker | undefined>(undefined)
    const [file, setFile] = useState<File | undefined>()

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.csv']
        },
        onDrop: async (acceptedFiles: File[]) => {
            if (!acceptedFiles.length) {
                toast.error('Cannot upload file', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                })

                return
            }

            setResult(undefined)
            await upload(acceptedFiles)
        },
    })

    const { ref, ...rootProps } = getRootProps()

    const onUploadProgress = useCallback((event: any) => {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        setProgress(percentCompleted)
    }, [setProgress]);

    const upload = useCallback(async (files: File[]) => {
        const data = new FormData();

        if (!files.length) {
            toast.error("File not found", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
            })

            return
        }
        data.append('file', files[0])
        setFile(files[0])

        try {
            const result = await uploadCSVFileByFormData(data, onUploadProgress)

            setResult(result.data)
        } catch (error) {
            toast.error("Cannot upload file", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
            })
        } finally {
            setFile(undefined)
        }
    }, [onUploadProgress])


    return <>
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            mt={3}
        >
            <Grid>
                <Typography variant='h5'>
                    Website checker
                </Typography>
                <FormControl component="fieldset" fullWidth={true}>
                    <Grid {...rootProps} className="dragndrop padded-zone">
                        <div className='drop-area highlight'>
                            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                <img src={svgImg} height="50px" alt="svg" />
                            </Box>
                            <Grid className="drop-zone" my={1}>
                                <Typography variant="h6" style={{
                                    fontWeight: "bold",
                                    color: '#64697F'
                                }}>
                                    Drag your csv. file to start uploading
                                </Typography>
                            </Grid>
                            <input {...getInputProps()} />
                            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                ----------- OR -----------
                            </Box>
                            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                <Grid mt={1}>
                                    <Button variant="contained" style={{
                                        background: "#6749F5"
                                    }} onKeyDown={() => ref.current?.click()}>
                                        Browse File
                                    </Button>
                                </Grid>
                            </Box>
                        </div>
                    </Grid>
                </FormControl>
            </Grid>
            {file && <HealthCheckerProgress file={file} progress={progress} />}
            {result && <HealthCheckerResult healthChecker={result} />}
            <Grid>
            </Grid>
        </Grid >
    </>;

}

export default HomePage