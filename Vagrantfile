# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.define "kvm-host" do |guest|
    guest.vm.box = "generic/ubuntu1810"

    guest.vm.hostname = "kvm-host"

    guest.vm.network :private_network, ip: "192.168.202.201"
    guest.vm.synced_folder "./", "/vagrant", create: true

    guest.vm.provider "virtualbox" do |v|
      v.memory = "2048"
      v.cpus = 4
      v.customize ["modifyvm", :id, "--cpuexecutioncap", "90"]
    end
    guest.vm.provision :shell, path: "test.sh", keep_color: "true"

    # guest.vm.provision "ansible" do |ansible|
    #  ansible.playbook = "test.yml"
    #  ansible.limit = "all"
    #end
  end
end
