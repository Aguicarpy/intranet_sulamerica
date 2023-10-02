import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterUsers, allPositions, allLocals } from '../../../Redux/actions';
import styles from "./FiltersUsers.module.css";

const FiltersUsers = ({users, setFilteredUsers, filterValues, setFilterValues}) => {
    const dispatch = useDispatch();
    const { filters, orden } = useSelector((state) => state);
    const dataPosition = useSelector((state) => state.dataPositions);
    const dataLocal = useSelector((state) => state.dataLocals);
  
    // const [filterValues, setFilterValues] = useState({
    //   local: '',
    //   department: '',
    //   position: '',
    //   orden:''
    // });
    // const [orderValue, setOrderValue] = useState('');
    const [positionsData, setPositionsData] = useState([]);
    const [localsData, setLocalsData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const oneDepartment = [...new Set(departmentData)];
  
    useEffect(() => {
      dispatch(allPositions());
      dispatch(allLocals());
    }, [dispatch]);
  
    useEffect(() => {
      if (dataPosition.length > 0) {
        setPositionsData(dataPosition.map((cargo) => cargo.position));
        setDepartmentData(dataPosition.map((cargo) => cargo.department));
      }
    }, [dataPosition]);
  
    useEffect(() => {
      if (dataLocal.length > 0) {
        setLocalsData(dataLocal.map((locals) => locals.local));
      }
    }, [dataLocal]);

    useEffect(() => {
      // Llama a applyFilters con dispatch y espera a que se complete
      dispatch(
        filterUsers(
          filterValues.orden,
          filterValues.position,
          filterValues.local,
          filterValues.department
        )
      );
    }, [dispatch, filterValues]);
  
    const handleFilterChange = (filterName, value) => {
      setFilterValues((prevValues) => ({ ...prevValues, [filterName]: value }));
      // onFilterChange(filterName, value);
    };
  
    // const handleOrdenChange = (value) => {
    //   setOrderValue(value);
    // };
  
    // const filteredResults = useSelector((state) => state.filters);
    // const handleApplyFilters = (event) => {
    //     event.preventDefault();
    //     // dispatch(setFilter(filterValues));
    //     // dispatch(setOrden({ orden: orderValue }));
        
    //     // Llama a applyFilters con dispatch y espera a que se complete
    //     dispatch(filterUsers(filterValues.orden, filterValues.position, filterValues.local, filterValues.department));
        
    //     // Después de que se complete, obtén los resultados filtrados de la tienda
        
    //     // console.log("Filtered Results:", filteredResults); // Agrega esta línea
      
    //     // setFilteredUsers(filteredResults);
    // };
  
    const resetFilter = (event) => {
      event.preventDefault();
      setFilterValues({
        local: '',
        department: '',
        position: '',
        orden: ''
      });
    //   setOrderValue('');
    //   dispatch(setFilter({ local: '', department: '', position: '' }));
    //   dispatch(setOrden({ orden: '' }));
      dispatch(filterUsers({ local: '', department: '', position: '', orden:'' }));
    };
  
    return (
      <Form>
        <Row className={styles.filterButtonRow}>
          <Col className={styles.filtros}>
            <div className={styles.filterButton}>
              <select
                className={styles.filterButtonInner}
                value={filterValues.local}
                onChange={(e) => handleFilterChange('local', e.target.value)}
              >
                <option value="">Seleccione una sucursal</option>
                {localsData.map((localOption, index) => (
                  <option key={index} value={localOption}>
                    {localOption}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <Col className={styles.filtros}>
            <div className={styles.filterButton}>
              <select
                className={styles.filterButtonInner}
                value={filterValues.position}
                onChange={(e) => handleFilterChange('position', e.target.value)}
              >
                <option value="">Seleccione una posición</option>
                {positionsData.map((positionOption, index) => (
                  <option key={index} value={positionOption}>
                    {positionOption}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <Col>
            <div className={styles.filterButton}>
              <select
                className={styles.filterButtonInner}
                value={filterValues.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">Seleccione un área</option>
                {oneDepartment.map((departmentOption, index) => (
                  <option key={index} value={departmentOption}>
                    {departmentOption}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <Col>
            <div className={styles.filterButton}>
              <select
                className={styles.filterButtonInner}
                value={filterValues.orden}
                onChange={(e) => handleFilterChange('orden', e.target.value)}
              >
                <option value="">Ordenar por</option>
                <option value="name-ASC">Ascendente A-Z</option>
                <option value="name-DESC">Descendente Z-A</option>
              </select>
            </div>
          </Col>
          <Row className={styles.filterButtonRow}></Row>
          <Col>
            {/* <button onClick={handleApplyFilters} className={styles.filterButtonFiltrar}>
              Filtrar
            </button> */}
            <button onClick={resetFilter} className={styles.filterButtonFiltrar}>
              Restablecer Filtros
            </button>
          </Col>
        </Row>
      </Form>
    );
};

export default FiltersUsers;