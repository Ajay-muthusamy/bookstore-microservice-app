pipeline {
    agent any

    environment {
        SUCCESS_COLOR = 'good'
        FAILURE_COLOR = 'danger'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/Ajay-muthusamy/bookstore-microservice-app.git'
            }
        }

        stage('Build Cart Service') {
            steps {
                dir('cart-service') {
                    sh '''
                        chmod +x ./mvnw
                        ./mvnw clean package -DskipTests
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down && docker-compose up -d'
            }
        }
    }

    post {
        always {
            script {
                def color = (currentBuild.currentResult == 'SUCCESS') ? env.SUCCESS_COLOR : env.FAILURE_COLOR
                slackSend(
                    channel: '#devopscicd',
                    color: color,
                    message: "*${currentBuild.currentResult}:* Job `${env.JOB_NAME}` build #${env.BUILD_NUMBER}\n🔗 <${env.BUILD_URL}|View Job Details>"
                )
            }
        }
    }
}
