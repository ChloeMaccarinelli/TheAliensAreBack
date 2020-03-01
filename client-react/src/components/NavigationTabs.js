import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tableau from "./Tableau";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const NavigationTabs = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [cas, setCas] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(5);
    const [order, setOrder] = React.useState(0);
    const [totalCas, setTotalCas] = React.useState(0);

    const handleChangeTab = (newValue) => { setValue(newValue) };

    const handlerChangeOrder = (order) => { setOrder(order) };

    const handlerChangePage = (page) => { setPage(page) };

    const handlerChangeRowsPerPage = (rowPerPage) => { setPage(0); setPageSize(rowPerPage) };

    useEffect(() => {
        getDataFromServer();
    }, [page, pageSize, order]);

    const getDataFromServer = () => {
        fetch('http://localhost:8080/api/v1/cas?page=' + page + '&pagesize=' + pageSize + '&order=' + order)
            .then(response => {
                return response.json(); // transforme le json texte en objet js
            })
            .then(res => { // res c'est le texte json de response ci-dessus
                setCas(function(oldCas) {
                    const newCas = res.data;
                    return newCas;
                });
                setTotalCas(function(oldTotalCas) {
                    const newTotalCas = res.count;
                    return newTotalCas;
                });
            })
            .catch(err => {
                console.log("erreur dans le get : " + err)
            });
    };

    return (
        <div className={classes.root}>

            <TabPanel value={value} index={0}>
                <Tableau data={cas}
                         totalCas={totalCas}
                         handleChangeOrder={handlerChangeOrder}
                         handlerChangePage={handlerChangePage}
                         handlerChangeRowsPerPage={handlerChangeRowsPerPage} />
            </TabPanel>


        </div>
    );
};

export default NavigationTabs;
