import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Button, Grid, Header, Image } from 'semantic-ui-react'
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropZone from './PhotoWidgetDropzone';
import { Cropper } from 'react-cropper';

interface Props {
    uploadPhoto: (file: Blob) => void;
    uploading: boolean;
}

export default observer(
    function PhotoUploadWidget ({uploadPhoto, uploading} : Props) {
        const [files, setFiles] = useState<any>([]);
        const [cropper, setCropper] = useState<Cropper>();

        function onCrop () {
            if (cropper) {
                cropper.getCroppedCanvas().toBlob(blob => {
                    uploadPhoto(blob!);
                })
            }
        }

        useEffect(() => {
            return () => {
                files.forEach((file: any) => URL.revokeObjectURL(file.preview))
            }
        }, [files])
        return (
            <Grid>
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 1 - Add Photo' />
                    <PhotoWidgetDropZone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize Image' />
                    {files?.length > 0 && (
                        <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                    )}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files?.length > 0 &&
                        <>
                            <div className='image-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                            <Button.Group>
                                <Button onClick={onCrop} positive icon='check' loading={uploading} disabled={uploading}/>
                                <Button onClick={() => setFiles([])} icon='close' disabled={uploading}/>
                            </Button.Group>
                        </>
                    }
                </Grid.Column>
            </Grid>
        )
    }

)