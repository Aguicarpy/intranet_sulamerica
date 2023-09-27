import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { getAllConvocations } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ConvocationsTable.module.css'

function ApplyWorkTable() {
    const convocations = useSelector((state) => state.getConvocations)
    console.log(convocations);
    const dispatch = useDispatch()
    
    useEffect(() =>{
        dispatch(getAllConvocations())
    }, [dispatch])

    return (
      <div className="table-responsive">
        <Table bordered responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Titulo</th>
                          <th>Área</th>
                          <th>Posición</th>
                          <th>Sucursal</th>
                          <th>Salario</th>
                          <th>Horario</th>
                          <th>Creado el</th>
                        </tr>
                      </thead>
                      <tbody>
                        {convocations.map((convocation, index) => (
                          <tr key={convocation.id}>
                            <td>{index + 1}</td>
                            <td className={styles.typecell}>{convocation.title}</td>
                            <td className={styles.typecell}>{convocation.position.department}</td>
                            <td className={styles.typecell}>{convocation.position.position}</td>
                            <td className={styles.typecell}>{convocation.position.local}</td>
                            <td className={styles.typecell}>{convocation.position.salary}</td>
                            <td className={styles.typecell}>{convocation.position.shedule}</td>
                            <td className={styles.typecell}>{convocation.createdAt}</td>
                          <td>
                              <button style={{marginTop:"5px"}} className={styles.type}>Editar</button>
                          </td>
                          </tr>
                        ))}
                      </tbody>
                  </Table>
      </div>
    );
}

export default ApplyWorkTable;
