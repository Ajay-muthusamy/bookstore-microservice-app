resource "aws_instance" "INSTANCEAWS" {
  ami           = data.aws_ami.amiID.id
  instance_type = "t2.large"
  key_name = "deployer"
  vpc_security_group_ids = [aws_security_group.deployer-sg.id]
  availability_zone = "us-east-1a"

  tags = {
    Name = "bookstore"
  }
}   