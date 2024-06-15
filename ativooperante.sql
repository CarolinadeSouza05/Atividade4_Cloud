CREATE TABLE entregador(
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  disponibilidade enum('Sim','Não') NOT NULL,
  veiculo varchar(255) NOT NULL,
  whats varchar(16) NOT NULL,
  servicos varchar(200) NOT NULL
);


INSERT INTO entregador (nome, disponibilidade, veiculo, whats, servicos) VALUES
('João Silva', 'Sim', 'Moto', '12345678901', 'Entrega Rápida');