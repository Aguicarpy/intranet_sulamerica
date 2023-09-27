import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { allApplyWork } from '../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ApplyWorkTable.module.css'

function ApplyWorkTable() {
    const applyWorks = useSelector((state) => state.allApplyWorks)
    // console.log(applyWorks);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(allApplyWork())
    }, [dispatch])

  return (
    <div className="table-responsive">
      <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Interesado</th>
                        <th>Telefono</th>
                        <th>email</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applyWorks.map((work, index) => (
                        <tr key={work.id}>
                          <td>{index + 1}</td>
                          <td className={styles.typecell}>{work.Convocation.title}</td>
                          <td className={styles.typecell}>{work.Officer.name}</td>
                          <td className={styles.typecell}>{work.Officer.phone}</td>
                          <td className={styles.typecell}>{work.Officer.email}</td>
                          <td className={styles.typecell}>{work.Convocation.state}</td>
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
