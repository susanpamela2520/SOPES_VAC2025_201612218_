#include <linux/module.h>
#include <linux/kernel.h>
/* Header para las macros module_init y module_exit */
#include <linux/init.h>
/* Info. de la ram */
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>
#include <linux/hugetlb.h>
#include <linux/fs.h>
#include <linux/mmzone.h>
#include <linux/vmstat.h>

static int write_ram(struct seq_file *archivo, void *v) {
    //struct que contiene cierta informacion del sistema
    struct sysinfo info; 
    si_meminfo(&info);

    // Variables donde se guaarda la info.
    long total_memoria = info.totalram * info.mem_unit;
    long memoria_libre = info.freeram * info.mem_unit;
    long memoria_buffer = info.bufferram * info.mem_unit;
    long memoria_cache = (global_node_page_state(NR_FILE_PAGES) + info.bufferram) * info.mem_unit;

    // Conversiones de MB a GB
    long total_mega = total_memoria / (1024*1024); 
    long libre_mega = memoria_libre / (1024*1024);
    long buffer_mega = memoria_buffer / (1024*1024);
    long cache_mega = memoria_cache /  (1024*1024);
    long uso_mega = (total_mega) - (libre_mega + buffer_mega + cache_mega);
    long porcentaje = (uso_mega * 100) / total_mega;

    // Retorna la informacion solicitada.
    seq_printf(archivo, "{\n");
    seq_printf(archivo, "\t\"total\": %8lu,\n", (total_memoria / (1000*1000)));
    seq_printf(archivo, "\t\"libre\": %8lu,\n", memoria_libre);
    seq_printf(archivo, "\t\"uso\": %8lu,\n", uso_mega);
    seq_printf(archivo, "\t\"porcentaje\": %lu\n", porcentaje);
    seq_printf(archivo, "}\n");
    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int my_proc_open(struct inode *inode, struct file *file) {
	return single_open(file, write_ram, NULL);	
}

static ssize_t my_proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos) {
    return 0;
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops my_fops = {
    .proc_open = my_proc_open,
    .proc_read = seq_read,
};

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int __init ram_mod_init(void) {
    proc_create("ram_201612218", 0, NULL, &my_fops);
    printk(KERN_INFO "SUSAN PAMELA HERRERA MONZÓN\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void __exit ram_mod_exit(void) {
	remove_proc_entry("ram_201612218", NULL);
	printk(KERN_INFO "@modulo_ram finalizado");
}

module_init(ram_mod_init);
module_exit(ram_mod_exit);

MODULE_LICENSE("Proyecto 1 - SO1");
MODULE_AUTHOR("SUSAN PAMELA HERRERA MONZÓN");
MODULE_DESCRIPTION("Modulo que muestra la ram total, en uso, libre y porcetaje de uso.");
MODULE_VERSION("v1");
