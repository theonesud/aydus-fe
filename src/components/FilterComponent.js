'use client';
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
    Modal,
    Stack,
    Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const FilterComponent = ({
    onFilterChange,
    onDateRangeChange,
    dateRange,
    onApplyConditions,
    onDownload,
}) => {
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
        con: 'AND', // Default conjunction
    });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingIndex(null);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleMetricOpen = () => {
        setSelectedMetrics(true);
        setIsMetApplied(true);
    };

    const handleAtrOpen = () => {
        setSelectedAttributes(true);
        setIsAtrApplied(true);
    };

    const addCondition = () => {
        setConditions([...conditions, newCondition]);
        setNewCondition({ field: '', operator: '', value: '', con: 'AND' }); // Reset with default conjunction
    };

    const deleteCondition = (index) => {
        setConditions(conditions.filter((_, i) => i !== index));
    };

    const handleChange = (prop, index) => (event) => {
        if (index !== undefined) {
            // Editing existing condition
            const updatedConditions = [...conditions];
            updatedConditions[index][prop] = event.target.value;
            setConditions(updatedConditions);
        } else {
            // Updating new condition form
            setNewCondition({ ...newCondition, [prop]: event.target.value });
        }
    };

    const startEditingCondition = (index) => {
        setEditingIndex(index);
    };

    const stopEditingCondition = () => {
        setEditingIndex(null);
    };
    const handleApply = () => {
        onApplyConditions(conditions); // send conditions to parent
        handleClose();
    };
    const commonTypographyStyles = {
        padding: 1,
        cursor: 'pointer',
        borderRadius: 2,
        marginBottom: 2,
        marginRight: 3,
    };

    const selectedStyles = {
        backgroundColor: '#f0f0f0',
        color: '#1B39CA',
    };

    const appliedBadgeStyles = {
        background: 'white',
        fontSize: '12px',
        padding: '2px 4px',
        borderRadius: 10,
        color: 'black',
        marginLeft: 8,
    };

    const fieldOptions = [
        "ActiveProductCount",
        "ActiveVariantCount",
        "AddToCartRate",
        "AddToCarts",
        "AverageSellingPrice",
        "BlendedCRRCatalogAds",
        "BlendedCRREstSpends",
        "BlendedROASCatalogAds",
        "BlendedROASEstSpends",
        "CPSCatalogSpends",
        "CPSEstSpends",
        "ConversionRate",
        "DiscountedProductCount",
        "FbCPC",
        "FbCTR",
        "FbClicks",
        "FbImpressions",
        "GABlendedCRRCatalogSpends",
        "GABlendedCRREstSpends",
        "GABlendedROASCatalogSpends",
        "GABlendedROASEstSpends",
        "GACPSCatalogSpends",
        "GACPSEstSpends",
        "GoogleCPC",
        "GoogleCTR",
        "GoogleClicks",
        "GoogleImpressions",
        "InStockProductCount",
        "InStockVariantCount",
        "OutOfStockProductCount",
        "OutofstockVariantsCount",
        "ProductName",
        "ProductPageViews",
        "ProductSku",
        "PurchaseValue",
        "Purchases",
        "PurchasesPmaxAds",
        "PurchasesValuePmaxAds",
        "Purchases_1",
        "ROASPmaxAds",
        "SpendsCatalogAds",
        "SpendsPMaxAds",
        "TotalCatalogSpendsFB+Google",
        "TotalProductCount",
        "TotalRevenue",
        "TotalSpendEstimated",
        "TransactionRate"
    ];
    const operators = [
        "Equals",
        "Not Equals",
        "Greater Than",
        "Less Than",
        "Greater Than or Equals",
        
    ]

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
                    flexGrow: 1,
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
                        boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)',
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
                    },
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
                        py: 7,
                        borderRadius: 1,
                        display: 'flex',
                        overflow: 'hidden',

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
                    <Box
                        sx={{
                            width: 200,
                            borderRight: 1,
                            borderColor: 'divider',
                            mr: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            onClick={() => handleOptionSelect('metrics')}
                            className={`font-sans `}
                            sx={{
                                ...commonTypographyStyles,
                                ...(selectedOption === 'metrics'
                                    ? selectedStyles
                                    : {}),
                            }}
                        >
                            Metrics
                            {isMetApplied && (
                                <span style={appliedBadgeStyles}>Applied</span>
                            )}
                        </Typography>

                        <Typography
                            variant="h6"
                            onClick={() => handleOptionSelect('attributes')}
                            className={`font-sans `}
                            sx={{
                                ...commonTypographyStyles,
                                ...(selectedOption === 'attributes'
                                    ? selectedStyles
                                    : {}),
                                marginBottom: 0, // To remove margin-bottom from the last item
                            }}
                        >
                            Attributes
                            {isAtrApplied && (
                                <span style={appliedBadgeStyles}>Applied</span>
                            )}
                        </Typography>
                    </Box>

                    {/* Main Content */}
                    <Box sx={{ flexGrow: 1, p: 2 }}>
                        {selectedOption === 'metrics' && (
                            <div>
                                <Typography variant="h5">
                                    Add a metric filter
                                </Typography>
                                <div
                                    style={{
                                        fontSize: '14px',
                                        marginBottom: 16,
                                    }}
                                >
                                    Common metrics include: Spend, Revenue,
                                    Clicks, CTR
                                </div>
                                {selectedMetrics ? (
                                    <div>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                width: '100%',
                                                bgcolor: 'background.paper',
                                                boxShadow: 2,
                                                p: 4,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedMetrics(false);
                                                    setIsMetApplied(false);
                                                }}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            {
                                                conditions.map((condition, index) => (
                                                    <div style={{
                                                        display: 'flex',
                                                        gap: 10,
                                                        marginBottom: 10

                                                    }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel>
                                                                Select Field
                                                            </InputLabel>
                                                            <Select
                                                                value={condition.field}
                                                                label="Select Field"
                                                                onChange={handleChange(
                                                                    'field',
                                                                    index
                                                                )}
                                                            >
                                                                {fieldOptions.map((option) => (
                                                                    <MenuItem key={option} value={option}>
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            <InputLabel>
                                                                Select Operator
                                                            </InputLabel>
                                                            <Select
                                                                value={condition.operator}
                                                                label="Select Operator"
                                                                onChange={handleChange(
                                                                    'operator',
                                                                    index
                                                                )}
                                                            >
                                                               {operators.map((option) => (

                                                                    <MenuItem key={option} value={option}>
                                                                        {option}
                                                                    </MenuItem>

                                                               ))}
                                                            </Select>
                                                        </FormControl>
                                                        <TextField
                                                            fullWidth
                                                            label="Enter Value"
                                                            value={condition.value}
                                                            onChange={handleChange(
                                                                'value',
                                                                index
                                                            )}
                                                        />
                                                        <IconButton
                                                            onClick={() => deleteCondition(index)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>

                                                    </div>
                                                ))
                                            }
                                            <div sx={{ mb: 2 }}>
                                                Add Condition
                                            </div>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 2,
                                                    mb: 2,
                                                }}
                                            >
                                                {
                                                    conditions.length > 0 && (
                                                        <FormControl fullWidth>
                                                    <InputLabel>
                                                        Select Conjunction
                                                    </InputLabel>
                                                    <Select
                                                        value={
                                                            newCondition.con
                                                        }
                                                        label="Select Conjunction"
                                                        onChange={handleChange(
                                                            'con'
                                                        )}
                                                    >
                                                        <MenuItem value="AND">
                                                            AND
                                                        </MenuItem>
                                                        <MenuItem value="OR">
                                                            OR
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                                    )
                                                }
                                                
                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        Select Field
                                                    </InputLabel>
                                                    <Select
                                                        value={
                                                            newCondition.field
                                                        }
                                                        label="Select Field"
                                                        onChange={handleChange(
                                                            'field'
                                                        )}
                                                    >
                                                        {fieldOptions.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        Select Operator
                                                    </InputLabel>
                                                    <Select
                                                        value={
                                                            newCondition.operator
                                                        }
                                                        label="Select Operator"
                                                        onChange={handleChange(
                                                            'operator'
                                                        )}
                                                    >
                                                        {operators.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    fullWidth
                                                    label="Enter Value"
                                                    value={newCondition.value}
                                                    onChange={handleChange(
                                                        'value'
                                                    )}
                                                />
                                            </Box>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                    gap: 10
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={<AddIcon />}
                                                    onClick={addCondition}
                                                >
                                                    Add Condition
                                                </Button>
                                            </div>
                                        </Box>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{ mb: 2, mt: 4 }}
                                        >
                                            {conditions.map(
                                                (condition, index) => (
                                                    <React.Fragment key={index}>
                                                        {index > 0 && (
                                                            <Chip
                                                                label={`${condition.con}`}
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                            />
                                                        )}

                                                        {editingIndex === index ? (
                                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                                <FormControl size="small" fullWidth>
                                                                    <InputLabel>
                                                                        Select Field
                                                                    </InputLabel>
                                                                    <Select
                                                                        value={condition.field}
                                                                        label="Select Field"
                                                                        onChange={handleChange(
                                                                            'field',
                                                                            index
                                                                        )}
                                                                    >
                                                                        {fieldOptions.map((option) => (
                                                                            <MenuItem key={option} value={option}>
                                                                                {option}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                                <FormControl size="small" fullWidth>
                                                                    <InputLabel>
                                                                        Select Operator
                                                                    </InputLabel>
                                                                    <Select
                                                                        value={condition.operator}
                                                                        label="Select Operator"
                                                                        onChange={handleChange(
                                                                            'operator',
                                                                            index
                                                                        )}
                                                                    >
                                                                        <MenuItem value="equals">
                                                                            Equals
                                                                        </MenuItem>
                                                                        <MenuItem value="contains">
                                                                            Contains
                                                                        </MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <TextField
                                                                    size="small"
                                                                    value={condition.value}
                                                                    onChange={handleChange(
                                                                        'value',
                                                                        index
                                                                    )}
                                                                />
                                                                <IconButton
                                                                    onClick={stopEditingCondition}
                                                                >
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Box>
                                                        ) : (
                                                            <Chip
                                                                label={`${condition.field} ${condition.operator} ${condition.value}`}
                                                                onClick={() =>
                                                                    startEditingCondition(
                                                                        index
                                                                    )
                                                                }
                                                                onDelete={() =>
                                                                    deleteCondition(
                                                                        index
                                                                    )
                                                                }
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                )
                                            )}
                                        </Stack>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        onClick={handleMetricOpen}
                                        sx={{
                                            backgroundColor: 'white',
                                            color: 'gray.900',
                                            border: '1px solid #e0e0e0',
                                            fontSize: '0.875rem', // Equivalent to text-sm in Tailwind CSS
                                            fontWeight: 600, // Equivalent to font-semibold
                                            boxShadow:
                                                '0 1px 2px rgba(0, 0, 0, 0.05)', // Equivalent to shadow-sm
                                            paddingX: '0.875rem', // Equivalent to px-3.5 in Tailwind CSS
                                            paddingY: '0.625rem', // Equivalent to py-2.5 in Tailwind CSS
                                            borderRadius: '0.375rem', // Equivalent to rounded-md
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5', // Equivalent to hover:bg-gray-50
                                            },
                                            width: 'auto',
                                            height: '40px',
                                            ring: '1px solid #e0e0e0', // Equivalent to ring-1 ring-inset ring-gray-300
                                        }}
                                    >
                                        + Add Metric Filter
                                    </Button>
                                )}
                            </div>
                        )}
                        {selectedOption === 'attributes' && (
                            <div>
                                <Typography variant="h5">
                                    Add an attribute filter
                                </Typography>
                                <div
                                    style={{
                                        fontSize: '14px',
                                        marginBottom: 16,
                                    }}
                                >
                                    Common attributes include: SKU id, MRP,
                                    Price
                                </div>
                                {selectedMetrics ? (
                                    <div>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                width: '100%',
                                                bgcolor: 'background.paper',
                                                boxShadow: 2,
                                                p: 4,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedMetrics(false);
                                                    setIsMetApplied(false);
                                                }}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <div sx={{ mb: 2 }}>
                                                Add Condition
                                            </div>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 2,
                                                    mb: 2,
                                                }}
                                            >

                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        Select Field
                                                    </InputLabel>
                                                    <Select
                                                        value={
                                                            newCondition.field
                                                        }
                                                        label="Select Field"
                                                        onChange={handleChange(
                                                            'field'
                                                        )}
                                                    >
                                                        {fieldOptions.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        Select Operator
                                                    </InputLabel>
                                                    <Select
                                                        value={
                                                            newCondition.operator
                                                        }
                                                        label="Select Operator"
                                                        onChange={handleChange(
                                                            'operator'
                                                        )}
                                                    >
                                                        <MenuItem value="equals">
                                                            Equals
                                                        </MenuItem>
                                                        <MenuItem value="contains">
                                                            Contains
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    fullWidth
                                                    label="Enter Value"
                                                    value={newCondition.value}
                                                    onChange={handleChange(
                                                        'value'
                                                    )}
                                                />
                                            </Box>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                }}

                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={<AddIcon />}
                                                    onClick={addCondition}
                                                >
                                                    Add Condition
                                                </Button>
                                            </div>
                                        </Box>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{ mb: 2, mt: 4 }}
                                        >
                                            {conditions.map(
                                                (condition, index) => (
                                                    <React.Fragment key={index}>
                                                        {index > 0 && (
                                                            <Chip
                                                                label={`${condition.con}`}
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                            />
                                                        )}

                                                        {editingIndex === index ? (
                                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                                <FormControl size="small" fullWidth>
                                                                    <InputLabel>
                                                                        Select Field
                                                                    </InputLabel>
                                                                    <Select
                                                                        value={condition.field}
                                                                        label="Select Field"
                                                                        onChange={handleChange(
                                                                            'field',
                                                                            index
                                                                        )}
                                                                    >
                                                                        {fieldOptions.map((option) => (
                                                                            <MenuItem key={option} value={option}>
                                                                                {option}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                                <FormControl size="small" fullWidth>
                                                                    <InputLabel>
                                                                        Select Operator
                                                                    </InputLabel>
                                                                    <Select
                                                                        value={condition.operator}
                                                                        label="Select Operator"
                                                                        onChange={handleChange(
                                                                            'operator',
                                                                            index
                                                                        )}
                                                                    >
                                                                        <MenuItem value="equals">
                                                                            Equals
                                                                        </MenuItem>
                                                                        <MenuItem value="contains">
                                                                            Contains
                                                                        </MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                                <TextField
                                                                    size="small"
                                                                    value={condition.value}
                                                                    onChange={handleChange(
                                                                        'value',
                                                                        index
                                                                    )}
                                                                />
                                                                <IconButton
                                                                    onClick={stopEditingCondition}
                                                                >
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Box>
                                                        ) : (
                                                            <Chip
                                                                label={`${condition.field} ${condition.operator} ${condition.value}`}
                                                                onClick={() =>
                                                                    startEditingCondition(
                                                                        index
                                                                    )
                                                                }
                                                                onDelete={() =>
                                                                    deleteCondition(
                                                                        index
                                                                    )
                                                                }
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                )
                                            )}
                                        </Stack>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        onClick={handleAtrOpen}
                                        sx={{
                                            backgroundColor: 'white',
                                            color: 'gray.900',
                                            border: '1px solid #e0e0e0',
                                            fontSize: '0.875rem', // Equivalent to text-sm in Tailwind CSS
                                            fontWeight: 600, // Equivalent to font-semibold
                                            boxShadow:
                                                '0 1px 2px rgba(0, 0, 0, 0.05)', // Equivalent to shadow-sm
                                            paddingX: '0.875rem', // Equivalent to px-3.5 in Tailwind CSS
                                            paddingY: '0.625rem', // Equivalent to py-2.5 in Tailwind CSS
                                            borderRadius: '0.375rem', // Equivalent to rounded-md
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5', // Equivalent to hover:bg-gray-50
                                            },
                                            width: 'auto',
                                            height: '40px',
                                            ring: '1px solid #e0e0e0', // Equivalent to ring-1 ring-inset ring-gray-300
                                        }}
                                    >
                                        + Add Attribute Filter
                                    </Button>
                                )}
                            </div>
                        )}
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleApply}
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            width: '100px',
                            height: '40px',
                        }}
                    >
                        Apply
                    </Button>
                </Box>
                
            </Modal>
        </Box>
    );
};

export default FilterComponent;
