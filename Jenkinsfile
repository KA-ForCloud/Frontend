// // node {
// //     checkout scm
// //     environment{
// //         imagename = "lmslmsms0616/teamchat_front"
// //         registryCredential = 'docker-hub'
// //         dockerImage = ''
// //     }
// //     // docker build
// //     stage('Bulid Docker') {
// //         echo 'Bulid Docker'
// //         script {
// //             dockerImage = docker.build imagename
// //         }
// //     }
// //     // docker push
// //     stage('Push Docker') {
// //         echo 'Push Docker'
// //         script {
// //             docker.withRegistry( '', registryCredential) {
// //                 dockerImage.push("${currentBuild.number}")  // ex) "1.0"
// //             }
// //         }
// //     }
// //     stage('Deploy') {
// //         echo "Deploy Start"
// //         sshagent(credentials: ['kic_key']) {
// //                     echo "sshagent start"
// //                     sh '''
// //                         ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10001 uptime
// //                         docker pull lmslmsms0616/teamchat_front:${currentBuild.number}
// //                         docker ps -q --filter name=front | grep -q . && docker rm -f $(docker ps -aq --filter name=front)
// //                         docker run -d --name front -p 3000:3000 lmslmsms0616/teamchat_front:${currentBuild.number}
// //                     '''
// //                     slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-1-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
// //                     echo "Web_1_Success"
// //                     sh ''' 
// //                         ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10002 uptime
// //                         docker pull lmslmsms0616/teamchat_front:${currentBuild.number}
// //                         docker ps -q --filter name=front | grep -q . && docker rm -f $(docker ps -aq --filter name=front)
// //                         docker run -d --name front -p 3000:3000 lmslmsms0616/teamchat_front:${currentBuild.number}
// //                     '''
// //                     slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-2-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
// //                     echo "Web_2_Success"
// //         }
// //     }

// }

pipeline {
    agent any
   
    environment{
        imagename = "lmslmsms0616/teamchat_front"
        registryCredential = 'docker-hub'
        dockerImage = ''
    }

    stages {
        // git에서 repository clone
        stage('Prepare') {
          steps {
            echo 'Clonning Repository'
            git url: 'https://github.com/KA-ForCloud/Frontend.git',
              branch: 'master'
            }
            post {
             success { 
               echo 'Successfully Cloned Repository'
             }
           	 failure {
               error 'This pipeline stops here...'
             }
          }
        }
        
        // docker build
        stage('Bulid Docker') {
          agent any
          steps {
            echo 'Bulid Docker'
            script {
                dockerImage = docker.build imagename
            }
          }
          post {
            failure {
              error 'This pipeline stops here...'
            }
          }
        }

        // docker push
        stage('Push Docker') {
          agent any
          steps {
            echo 'Push Docker'
            script {
                docker.withRegistry( '', registryCredential) {
                    dockerImage.push("${currentBuild.number}")  // ex) "1.0"
                }
            }
          }
          post {
            failure {
              error 'This pipeline stops here...'
            }
          }
        }
        stage('Deploy to dev') {
          steps {
                sshagent(credentials: ['kic_key']) {
                    echo "sshagent start"

                    // sh "ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10001 uptime"
                    sh "ssh -tt -p 10001 StrictHostKeyChecking=no centos@210.109.60.60 'docker ps -q --filter name=front | grep -q . && docker stop front && docker rm front || true'"
                    sh "ssh -tt -p 10001 StrictHostKeyChecking=no centos@210.109.60.60 'docker rmi -f lmslmsms0616/teamchat_front:latest'"
                    sh "ssh -tt -p 10001 StrictHostKeyChecking=no centos@210.109.60.60 'docker run -d --name front -p 3000:3000 lmslmsms0616/teamchat_front:${currentBuild.number}'"
                    
                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-1-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                    echo "Web_1_Success"

                    // sh "ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10002 uptime"
                    sh "ssh -tt -p 10002 StrictHostKeyChecking=no centos@210.109.60.60 'docker ps -q --filter name=front | grep -q . && docker stop front && docker rm front || true'"
                    sh "ssh -tt -p 10002 StrictHostKeyChecking=no centos@210.109.60.60 'docker rmi -f lmslmsms0616/teamchat_front:latest'"
                    sh "ssh -tt -p 10002 StrictHostKeyChecking=no centos@210.109.60.60 'docker run -d --name front -p 3000:3000 lmslmsms0616/teamchat_front:${currentBuild.number}'"

                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-2-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                    echo "Web_2_Success"
                }
            }

           post {
                    failure {
                      echo 'Update 실패ㅠㅠ'
                    }
                    success {
                      echo 'Update 성공!!!! test'
                    }
            }
        }
    }
}


