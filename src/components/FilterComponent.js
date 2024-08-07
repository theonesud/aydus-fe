'use client'
import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    IconButton,
    Typography,
    Divider,
    Stack,
    Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const FilterComponent = ({ onFilterChange, onDateRangeChange, dateRange, onDownload }) => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('metrics');
    const [selectedMetrics, setSelectedMetrics] = useState(false);
    const [isMetApplied, setIsMetApplied] = useState(false);
    const [isAtrApplied, setIsAtrApplied] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState(false);
    const [conditions, setConditions] = useState([]);
    const [newCondition, setNewCondition] = useState({
        field: '',
        operator: '',
        value: '',
        con: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    const handleMetricOpen = () => {
        setSelectedMetrics(true);
        setIsMetApplied(true);
    }
    const handleAtrOpen = () => {
        setSelectedAttributes(true);
        setIsAtrApplied(true);
    }

    const addCondition = () => {
        setConditions([...conditions, newCondition]);
        setNewCondition({ field: '', operator: '', value: '', con: '' }); // Reset the input form
    };

    const deleteCondition = (index) => {
        setConditions(conditions.filter((_, i) => i !== index));
    };

    const handleChange = (prop) => (event) => {
        setNewCondition({ ...newCondition, [prop]: event.target.value });
    };

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <TextField
                size="small"
                label="Search"
                variant="outlined"
                onChange={onFilterChange}
                InputProps={{
                    endAdornment: <SearchIcon />,
                }}
                sx={{
                    width: '50%',
                    boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)',
                }}
            />
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #e0e0e0',
                    boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)',
                    '&:hover': {
                        backgroundColor: '#f5f5f5',
                    },
                    width: '100px',
                    height: '40px',
                }}
            >
                Filters
            </Button>
            <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel id="date-range-label">Date Range</InputLabel>
                <Select
                    labelId="date-range-label"
                    id="date-range-select"
                    value={dateRange}
                    label="Date Range"
                    onChange={onDateRangeChange}
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)'
                    }}
                >
                    <MenuItem value={3}>Last 3 Days</MenuItem>
                    <MenuItem value={7}>Last 7 Days</MenuItem>
                    <MenuItem value={30}>Last Month</MenuItem>
                    <MenuItem value={180}>Last 6 Months</MenuItem>
                    <MenuItem value={365}>Last Year</MenuItem>
                </Select>
            </FormControl>
            <IconButton
                onClick={onDownload}
                sx={{
                    color: '#79798C',
                    '&:hover': {
                        backgroundColor: '#C7C7C7',
                    }
                }}
                aria-label="download"
            >
                <FileDownloadIcon />
            </IconButton>

            {/* Modal for additional filters */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1100,
                        height: 700,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 1,
                        display: 'flex',
                    }}
                >


                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Sidebar */}
                    <Box sx={{ width: 200, borderRight: 1, borderColor: 'divider', mr: 2 }}>
                        <Typography
                            variant="h6"
                            onClick={() => handleOptionSelect('metrics')}
                            sx={{
                                padding: 1,
                                cursor: 'pointer',
                                borderRadius: 2,
                                marginBottom: 3,
                                marginRight: 1,
                                backgroundColor: selectedOption === 'metrics' ? '#C7C7C7' : 'inherit',
                                color: selectedOption === 'metrics' ? '#1B39CA' : 'inherit',
                            }}
                        >
                            Metrics {isMetApplied && <span style={{ background: 'white', fontSize: '12px', padding: '2px 4px', borderRadius: 10, color: 'black' }}>Applied</span>}
                        </Typography>

                        <Typography
                            variant="h6"
                            onClick={() => handleOptionSelect('attributes')}
                            sx={{
                                padding: 1,
                                cursor: 'pointer',
                                borderRadius: 2,
                                marginRight: 1,
                                backgroundColor: selectedOption === 'attributes' ? '#C7C7C7' : 'inherit',
                                color: selectedOption === 'attributes' ? '#1B39CA' : 'inherit',
                            }}
                        >
                            Attributes{isAtrApplied && <span style={{ background: 'white', fontSize: '12px', padding: '2px 4px', borderRadius: 10, color: 'black' }}>Applied</span>}
                        </Typography>
                    </Box>

                    {/* Main Content */}
                    <Box sx={{ flexGrow: 1, p: 2 }}>
                        {selectedOption === 'metrics' && (
                            <div>
                                <Typography>
                                    Select your product metrics here.
                                </Typography>
                                <div style={{ fontSize: '12px', marginBottom: 16 }}>
                                    Add new filters for your metrics to get more detailed insights.
                                </div>
                                {
                                    selectedMetrics ?
                                        <div>

                                            <Box sx={{
                                                position: 'relative',
                                                width: '100%', bgcolor: 'background.paper', boxShadow: 2, p: 4, borderRadius: 2
                                            }}>
                                                <IconButton
                                                    onClick={() => { setSelectedMetrics(false); setIsMetApplied(false) }}
                                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                                {/* {conditions.map((condition, index) => (
                                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                        <Typography>{condition.con}{condition.field} {condition.operator} {condition.value}</Typography>
                                                        <IconButton onClick={() => deleteCondition(index)}><DeleteIcon /></IconButton>
                                                    </Box>
                                                ))} */}
                                                <div sx={{ mb: 2 }}>Add Condition</div>
                                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                    {conditions.length > 0 &&
                                                        <FormControl fullWidth>
                                                            <InputLabel>Select Field</InputLabel>
                                                            <Select
                                                                value={newCondition.con}
                                                                label="Select"
                                                                onChange={handleChange('con')}
                                                            >
                                                                <MenuItem value="AND">AND</MenuItem>
                                                                <MenuItem value="OR">OR</MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                    }
                                                    <FormControl fullWidth>
                                                        <InputLabel>Select Field</InputLabel>
                                                        <Select
                                                            value={newCondition.field}
                                                            label="Select Field"
                                                            onChange={handleChange('field')}
                                                        >
                                                            <MenuItem value="field1">Field 1</MenuItem>
                                                            <MenuItem value="field2">Field 2</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Select Operator</InputLabel>
                                                        <Select
                                                            value={newCondition.operator}
                                                            label="Select Operator"
                                                            onChange={handleChange('operator')}
                                                        >
                                                            <MenuItem value="equals">Equals</MenuItem>
                                                            <MenuItem value="contains">Contains</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        fullWidth
                                                        label="Enter Value"
                                                        value={newCondition.value}
                                                        onChange={handleChange('value')}
                                                    />
                                                </Box>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                    <Button
                                                        variant="contained"

                                                        startIcon={<AddIcon />}
                                                        onClick={addCondition}
                                                    >
                                                        Add Condition
                                                    </Button>
                                                </div>
                                            </Box>
                                            <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
                                                {conditions.map((condition, index) => (
                                                    <React.Fragment key={index}>
                                                        {index > 0 &&
                                                            <Chip
                                                                label={`${condition.con}`}
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{ fontSize: 14 }}
                                                            />
                                                        }

                                                        <Chip
                                                            label={`${condition.field} ${condition.operator} ${condition.value}`}
                                                            onDelete={() => deleteCondition(index)}
                                                            color="primary"
                                                            variant="outlined"
                                                            sx={{ fontSize: 14 }}
                                                        />
                                                    </React.Fragment>
                                                ))}
                                            </Stack>
                                        </div>
                                        :
                                        <Button
                                            variant="outlined"
                                            onClick={handleMetricOpen}
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                border: '1px solid #e0e0e0',
                                                fontSize: '12px',
                                                boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)',
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                                width: '130px',
                                                height: '40px',
                                            }}
                                        >
                                            + Add Metrics
                                        </Button>
                                }

                            </div>
                        )}
                        {selectedOption === 'attributes' && (
                            <div>
                                <Typography>
                                    select your products attributes
                                </Typography>
                                <div style={{ fontSize: '12px', marginBottom: 16 }}>
                                    Add new filters for your dimensions to refine your data analysis.
                                </div>
                                {
                                    selectedAttributes ?
                                        <div>
                                            <Typography>
                                                Attributes Filters
                                            </Typography>

                                        </div>
                                        :
                                        <Button
                                            variant="outlined"
                                            onClick={handleAtrOpen}
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                border: '1px solid #e0e0e0',
                                                fontSize: '12px',
                                                boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)',
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                                width: '130px',
                                                height: '40px',
                                            }}
                                        >
                                            + Add Dimension
                                        </Button>
                                }
                            </div>
                        )}

                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default FilterComponent;
