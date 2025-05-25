
resource "aws_vpc_security_group_ingress_rule" "allow_tcp_80" {
  security_group_id = aws_security_group.deployer-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "allow_tcp_8080" {
  security_group_id = aws_security_group.deployer-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 8080
  to_port           = 8080
  ip_protocol       = "tcp"
}


resource "aws_vpc_security_group_ingress_rule" "allow_tcp_3001" {
  security_group_id = aws_security_group.deployer-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 3001
  to_port           = 3001
  ip_protocol       = "tcp"
}


resource "aws_vpc_security_group_ingress_rule" "allow_tcp_5001" {
  security_group_id = aws_security_group.deployer-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 5001
  to_port           = 5001
  ip_protocol       = "tcp"
}


resource "aws_vpc_security_group_ingress_rule" "allow_tcp_7080" {
  security_group_id = aws_security_group.deployer-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 7080
  to_port           = 7080
  ip_protocol       = "tcp"
}
