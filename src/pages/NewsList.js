import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import $api from '../helpers/api_helper';
import Container from '@mui/material/Container';
import NewsCard from '../Components/News/NewsCard';
import {CircularProgress, Grid, InputAdornment, TextField} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const NewsList = ({country, setSearchFormat, countryName, formatSearch = 'everything', }) => {
    const {category: categoryName = ''} = useParams();
    const {pathname} = useLocation()
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const onSearchChange = (e) => {
        setTimeout(() => {
            setSearch(e.target.value.toLowerCase());
        }, 900);
    };

    useEffect(() => {
        setCategory(categoryName);
    }, [categoryName]);

    useEffect(() => {
        setSearchFormat(formatSearch);
    }, [formatSearch]);

    useEffect(()=>{
        setCurrentPage(1)
    },[pathname])

    useEffect(() => {
        setSearchFormat(formatSearch);
    }, []);

    useEffect(() => {
            setLoading(true)

            updateNews().then(({articles = [], totalResults = 0}) => {
                setArticles(articles);
                setTotal(totalResults);

                setLoading(false)
            }).catch((e)=> {console.log(e);}).finally( ()=> setLoading(false));
    }, [
        country,
        search,
        category,
        formatSearch
    ]);

    useEffect(() => {
        if (currentPage > 1) {
            updateNews().then(({articles = [], totalResults = 0}) => {
                setArticles(prev => {
                    return [...prev, ...articles];
                });
                setTotal(totalResults);

                setLoading(false)
            }).catch((e)=> {console.log(e);}).finally( ()=> setLoading(false));
        }
    }, [
        currentPage,
    ]);

    const updateNews = async () => {
        try {
            const {data} = await $api.get(`${formatSearch}`, {
                params: {
                    apiKey: process.env.REACT_APP_NEWS_API,
                    page: currentPage,
                    pageSize: pageSize,
                    q: formatSearch === 'top-headlines' || search ? search : 'a',
                    category: category,
                    country: formatSearch === 'everything' ? '' : country,
                    language: 'en',
                },
            });

            const {
                articles = [],
                totalResults = 0,
            } = data;

            return {
                articles,
                totalResults,
            };

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container flex>
            <h1 style={{display: formatSearch === 'top-headlines' ? 'block' : 'none'}}>Top news from: {countryName || 'All countries'}</h1>

            <h1 style={{display: formatSearch === 'everything' ? 'block' : 'none'}}>Everything news </h1>

            <TextField
                label="Search news"
                onChange={onSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{display: 'flex', mt: 7}}
            />

            {loading ?
                <CircularProgress style={{position: 'absolute', top: '50%', left: '50%'}} />
                :
                <InfiniteScroll
                    style={{margin: '40px 0px', marginTop: '90px', overflow: 'none'}}
                    dataLength={articles.length}
                    next={() => setCurrentPage((prev) => {
                        return ++prev;
                    })}
                    hasMore={articles.length !== total}
                    loader={
                        <div style={{textAlign: 'center'}}>
                            <CircularProgress/>
                        </div>
                    }
                >
                    <Grid container direction={'row'} spacing={1}>
                        { articles.length > 0 ?
                            articles.map(({urlToImage, title, description, author, url, publishedAt}, i) => (
                                <NewsCard
                                    key={i}
                                    urlToImage={urlToImage}
                                    title={title}
                                    description={description}
                                    author={author}
                                    url={url}
                                    publishedAt={publishedAt}
                                />
                            ))
                            :
                            <div style={{textAlign: 'center', width: '100%'}}>Article not found</div>
                        }
                    </Grid>
                </InfiniteScroll>
            }
        </Container>
    );
};

export default NewsList;
