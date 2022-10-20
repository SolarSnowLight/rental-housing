import { useState, useEffect } from 'react';
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Autocomplete, CircularProgress, TextField, InputLabel } from '@mui/material';

import findImg from '../../resources/images/find.svg';

import styles from './Filter.module.css';
import { styleText, styleTextGray, styleToggleButtonGroup, styleToggleButtonMargin } from './styles';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const theme = createTheme({
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: '1px solid #424041',
                    color: '#000000',
                    "&.Mui-selected": {
                        "backgroundColor": "#DEDEDE",
                        color: '#000000'
                    },
                    minWidth: '4em',
                    height: '4em'
                },
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    border: '1px solid #424041 !important',
                    borderRadius: '0px !important',
                    color: '#000000',
                    minWidth: '12em !important',
                    height: '4em'
                },
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginLeft: '0px !important',
                }
            }
        }
    },
});

const Filter = () => {
    /* Тестовый код для фильтра */
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...topFilms]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


    const [typeApartment, setTypeApartment] = useState('flat');
    const [countRoom, setCountRoom] = useState('one');
    const [priceFrom, setPriceFrom] = useState('от 2млн');
    const [priceTo, setPriceTo] = useState('до 100млн');
    const [location, setLocation] = useState('Иркутск');
    const [sortBy, setSortBy] = useState('Sort');

    const handleSortBy = (event) => {
        setSortBy(event.target.value);
    }

    const handleLocation = (event) => {
        setLocation(event.target.value);
    }

    const handlePriceFrom = (event) => {
        setPriceFrom(event.target.value);
    };

    const handlePriceTo = (event) => {
        setPriceTo(event.target.value);
    };

    const handleTypeApartment = (event, apartment) => {
        setTypeApartment(apartment);
    };

    const handleCountRoom = (event, count) => {
        setCountRoom(count);
    };

    return (
        <div>
            <div className={styles["filter-wrapper__header"]}>
                <div className={styles["filter-wrapper__subheader"]}>
                    { /* Тип */}
                    <div className={styles['block-wrapper']}>
                        <div>
                            <text className={styles['text--black']}>Тип</text>
                        </div>
                        <div>
                            <ThemeProvider theme={theme}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={typeApartment}
                                    exclusive
                                    onChange={handleTypeApartment}
                                    aria-label="Platform"
                                    sx={styleToggleButtonGroup}
                                >
                                    <ToggleButton value="flat">Квартира</ToggleButton>
                                    <ToggleButton
                                        value="home"
                                        sx={styleToggleButtonMargin}
                                    >Частный дом</ToggleButton>
                                </ToggleButtonGroup>
                            </ThemeProvider>
                        </div>
                    </div>

                    { /* Количество комнат */}
                    <div className={styles['block-wrapper']}>
                        <div>
                            <text className={styles['text--black']}>Количество комнат</text>
                        </div>
                        <div>
                            <ThemeProvider theme={theme}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={countRoom}
                                    exclusive
                                    onChange={handleCountRoom}
                                    aria-label="Platform"
                                    sx={styleToggleButtonGroup}
                                >
                                    <ToggleButton value="one">1</ToggleButton>
                                    <ToggleButton
                                        value="two"
                                        sx={styleToggleButtonMargin}
                                    >2</ToggleButton>
                                    <ToggleButton
                                        value="three"
                                        sx={styleToggleButtonMargin}
                                    >3</ToggleButton>
                                    <ToggleButton
                                        value="four"
                                        sx={styleToggleButtonMargin}
                                    >4+</ToggleButton>
                                </ToggleButtonGroup>
                            </ThemeProvider>
                        </div>
                    </div>

                    { /* Стоимость */}
                    <div className={styles['block-wrapper']}>
                        <div>
                            <text className={styles['text--black']}>Стоимость</text>
                        </div>
                        <div>
                            <ThemeProvider theme={theme}>
                                <FormControl sx={{ m: 1, minWidth: 120, marginBottom: "0px !important" }}>
                                    <Select
                                        value={priceFrom}
                                        onChange={handlePriceFrom}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={10}>10 млн</MenuItem>
                                        <MenuItem value={20}>20 млн</MenuItem>
                                        <MenuItem value={30}>30 млн</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value={priceTo}
                                        onChange={handlePriceTo}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={10}>10 млн</MenuItem>
                                        <MenuItem value={20}>20 млн</MenuItem>
                                        <MenuItem value={30}>30 млн</MenuItem>
                                    </Select>
                                </FormControl>
                            </ThemeProvider>
                        </div>
                    </div>

                    { /* Район */}
                    <div className={styles['block-wrapper']}>
                        <div>
                            <text className={styles['text--black']}>Район</text>
                        </div>
                        <div>
                            <ThemeProvider theme={theme}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value={location}
                                        onChange={handleLocation}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={10}>Иркутск</MenuItem>
                                        <MenuItem value={20}>Москва</MenuItem>
                                        <MenuItem value={30}>Якутск</MenuItem>
                                    </Select>
                                </FormControl>
                            </ThemeProvider>
                        </div>
                    </div>

                    { /* Демонстрация предложений */}
                    <div className={styles['block-wrapper']}>
                        <div className={styles['block-wrapper__button']}>
                            <Button
                                variant="contained"
                                sx={{
                                    marginBottom: '0.5em',
                                    backgroundColor: "#B4EFA6",
                                    ...styleText,
                                    'font-size': '14px !important',
                                    borderRadius: '0px !important',
                                    border: '1px solid #424041 !important',
                                    width: '15em',
                                    height: '4em'
                                }}>Показать 200 предложений</Button>
                        </div>
                    </div>
                </div>

                <div className={styles['filter-wrapper__subheader--exp']}>
                    { /* Название ЖК или адрес*/}
                    <div className={styles['block-wrapper']}>
                        <div>
                            <Autocomplete
                                id="asynchronous-demo"
                                sx={{
                                    width: 300,
                                    borderRadius: '0px !important'
                                }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                popupIcon={<img src={findImg} />}
                                isOptionEqualToValue={(option, value) => option.title === value.title}
                                getOptionLabel={(option) => option.title}
                                options={options}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Введите название ЖК или адрес"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    { /* Сортировать */}
                    <div className={styles['block-wrapper']}>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 120,  marginLeft: '0px !important', width: '4em'}}>
                                <InputLabel id="demo-simple-select-helper-label">Сортировать по</InputLabel>
                                <Select
                                    sx={{
                                        width: '10em'
                                    }}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={sortBy}
                                    label="Сортировать по"
                                    onChange={handleSortBy}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    { /* Демонстрация предложений */}
                    <div className={styles['block-wrapper']}>
                        <div>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "transparent",
                                    ...styleTextGray,
                                    'font-size': '14px !important',
                                    borderRadius: '0px !important',
                                    border: '1px solid #424041 !important',
                                    width: '15em',
                                    height: '4em'
                                }}>Показать все</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];

export default Filter;