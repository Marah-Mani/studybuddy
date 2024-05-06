import React from 'react'
import { Typography, Modal, Box, Stack, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material'
import { AddAPhoto } from "@mui/icons-material"
import axios from "axios";
import { useSelector } from "react-redux"
import toast from "react-hot-toast";


const AddPosts = ({ open, handlePostClick, setOpen, change }) => {
    const { user } = useSelector((state) => state.auth);

    const [values, setValues] = React.useState({
        title: "",
        description: "",
        category: "",
        image: [],
        user: user._id
    });
    const [files, setFiles] = React.useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...values, image: files };
        toast.loading("Creating post...");
        if (data.image.length === 0 || !data.title || !data.description || !data.category) {
            toast.dismiss();
            toast.error("Please fill all the required fields");
            return;
        }
        else {

            const res = await axios.post("http://localhost:3000/api/v1/post/newpost", data);
            toast.dismiss();
            toast.success(res.data.message)
            console.log("res", res);
            setOpen(false);
            change.setChange(!change.change);
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleFileInput = (event) => {
        const fileList = Array.from(event.target.files)
        const newFiles = fileList.reduce((acc, curr) => {
            const reader = new FileReader()
            reader.onload = () => {
                acc.push(reader.result)
                setFiles(prevFiles => [...prevFiles, reader.result])
            }
            reader.readAsDataURL(curr)
            console.log(files);
            return acc
        }, [])
        console.log(newFiles);

    }


    return (
        <Modal
            open={open}
            onClose={handlePostClick}
        >
            <Stack
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
                style={{ height: "75%",overflow:"auto" }}
                direction={"column"}
            >
                <Typography variant="h6" component="h2" fontSize={"2.5rem"} fontWeight={"bold"} textAlign={"center"} gutterBottom>
                    Add Post
                </Typography>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <Stack direction={"row"} spacing={"1rem"} sx={{ marginY: "1rem" }}>
                        {files?.map((file, index) => (
                            <img
                                key={index}
                                src={file}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: "10px" }}
                            />
                        ))}
                        <input
                            type="file"
                            name="attachments"
                            id="attachments"
                            accept="image/*"
                            multiple
                            onChange={handleFileInput}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="attachments">
                            <Button
                                variant="contained"
                                component="span"
                                disabled={files.length === 5 ? true : false}
                                sx={{ width: '100px', height: '100px' }}
                            >
                                <AddAPhoto
                                    sx={{ width: '70px', height: '70px' }}
                                />
                            </Button>
                        </label>
                    </Stack>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        sx={{
                            marginBottom: '1rem',
                        }}
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                        onChange={handleChange}

                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                            marginBottom: '2rem',
                        }}
                        id="description"
                        label="Description"
                        name="description"
                        autoFocus
                        onChange={handleChange}
                    />
                    <FormControl
                        sx={{
                            marginBottom: '2rem',
                        }}
                        variant="outlined" fullWidth>
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select
                            required
                            labelId="category"
                            id="category"
                            name="category"
                            value={values.category}
                            label="Category"
                            onChange={handleChange}
                        >
                            <MenuItem value="books">Books</MenuItem>
                            <MenuItem value="summary">Summary</MenuItem>
                            <MenuItem value="tools">Tools</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" >
                        Add Post
                    </Button>
                </form>
            </Stack>
        </Modal>
    )
}

export default AddPosts;