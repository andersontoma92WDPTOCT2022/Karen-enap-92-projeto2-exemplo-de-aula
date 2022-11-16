import { Button, Modal, Row, Col } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ModalCreateUser({reload, setReload}) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    salario: "",
    email: "",
    tel: "",
    departamento: "",
    dataAdmissao: "",
    status: "",
    stack: [],
    active: true,
    task: "",
    progresso: "",
    foto: "",
    cargo: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("https://ironrest.herokuapp.com/enap92", form);
      handleClose(); // fechar o modal
      setForm({
        //limpar o meu formulário
        nome: "",
        salario: "",
        email: "",
        tel: "",
        departamento: "",
        dataAdmissao: "",
        status: "",
        stack: [],
        active: true,
        task: "",
        progresso: "",
        foto: "",
        cargo: "",
      });
      toast.success("Funcionário criado com sucesso! :D")
      setReload(!reload)
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        + Criar um novo Funcionário
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Formulário de criação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FORMULÁRIO */}
          <form>
            <Row>
              <Col>
                <label>Nome do Funcionário</label>
                <input
                  type="text"
                  placeholder="Insira o nome completo do funcionário"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <label>Cargo</label>
                <input
                  type="text"
                  placeholder="Insira nome do cargo do funcionário"
                  name="cargo"
                  value={form.cargo}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Numero de Telefone</label>
                <input
                  type="text"
                  placeholder="Insira o telefone do funcionário"
                  name="tel"
                  value={form.tel}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Insira o email do funcionário"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Salário</label>
                <input
                  type="number"
                  placeholder="Insira o valor do salário R$"
                  name="salario"
                  value={form.salario}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <label>Departamento</label>
                <select name="departamento" onChange={handleChange}>
                  <option>Selecione uma opção</option>
                  <option value="Front-End">Front-End</option>
                  <option value="Back-End">Back-End</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Marketing">Marketing</option>
                  <option value="People">People</option>
                  <option value="Full-Stack">Full-Stack</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Status</label>
                <select name="status" onChange={handleChange}>
                  <option>Selecione uma opção</option>
                  <option value="Disponível">Disponível</option>
                  <option value="Alocado">Alocado</option>
                  <option value="De Férias">De Férias</option>
                  <option value="De Licença">De Licença</option>
                </select>
              </Col>
              <Col>
                <label>Data de Admissão</label>
                <input
                  type="date"
                  name="dataAdmissao"
                  value={form.dataAdmissao}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Adicione sua foto</label>
                <input
                  type="text"
                  placeholder="Insira a url da sua foto de perfil"
                  name="foto"
                  value={form.foto}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar Funcionário
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateUser;
